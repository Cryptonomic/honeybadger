import {
    ConseilQueryBuilder,
    ConseilOperator,
    ConseilSortDirection,
    TezosConseilClient,
    TezosNodeReader,
    TezosNodeWriter,
    TezosMessageUtils,
} from 'conseiljs';
import {Dispatch} from 'redux';

import config from '../../config';
import {KeyStoreUtils, SoftSigner} from '../../softsigner';

import {State} from '../types';

import {
    setBalanceAction,
    setRevealedAction,
    setTransactions,
    setDelegation,
    setDelegateExpectedDate
} from './actions';

export const syncAccount = () => async (
    dispatch: Dispatch,
    getState: () => State,
) => {
    try {
        const publicKeyHash = getState().app.publicKeyHash;

        try {
            const {balance, delegate} = await getAccountInfo(publicKeyHash);
            dispatch(setBalanceAction(balance));
            dispatch(setDelegation(delegate));

            const {expectedPaymentDate} = await getLastDelegation(publicKeyHash);
            dispatch(setDelegateExpectedDate(expectedPaymentDate));
        } catch (balanceError) {}

        try {
            if (!getState().app.revealed) {
                const isRevealed = await TezosNodeReader.isManagerKeyRevealedForAccount(
                    config[0].nodeUrl,
                    publicKeyHash,
                );
                dispatch(setRevealedAction(isRevealed));
            }
        } catch (revealError) {}

        try {
            // TODO: query for transactions since last sync - 60 seconds
            const transactions = await getTransactions(publicKeyHash);
            dispatch(setTransactions(transactions));
        } catch (transactionError) {}

        // TODO: tokens
    } catch (e) {}
};

export const getAccountInfo = async (accountHash: string): Promise<{balance: number, delegate: string}> => {
    const conseilUrl = config[0].url;
    const apiKey = config[0].apiKey;
    const network = config[0].network;

    let accountQuery = ConseilQueryBuilder.blankQuery();
    accountQuery = ConseilQueryBuilder.addFields(accountQuery, 'block_level','balance','delegate_value','counter','is_activated');
    accountQuery = ConseilQueryBuilder.addPredicate(accountQuery, 'account_id', ConseilOperator.EQ, [accountHash], false);
    accountQuery = ConseilQueryBuilder.setLimit(accountQuery, 1);

    const result = await TezosConseilClient.getAccounts({url: conseilUrl, apiKey, network}, network, accountQuery);

    if (result && result.length > 0) {
        return {balance: Number(result[0]['balance']), delegate: result[0]['delegate_value'] || '' };
    }

    return {balance: 0, delegate: ''};
};

export const getTransactions = async (accountHash: string) => {
    const conseilUrl = config[0].url; // TODO: read from state as an object
    const apiKey = config[0].apiKey;
    const network = config[0].network;

    let origin = ConseilQueryBuilder.blankQuery();
    origin = ConseilQueryBuilder.addFields(origin, 'timestamp', 'source', 'destination', 'amount', 'operation_group_hash', 'delegate', 'kind');
    origin = ConseilQueryBuilder.addPredicate(origin, 'kind', ConseilOperator.IN, ['transaction', 'delegation'], false);
    origin = ConseilQueryBuilder.addPredicate(origin, 'source', ConseilOperator.EQ, [accountHash], false);
    origin = ConseilQueryBuilder.addPredicate(origin, 'internal', ConseilOperator.EQ, ['false'], false);
    origin = ConseilQueryBuilder.addPredicate(origin, 'status', ConseilOperator.EQ, ['applied'], false);
    origin = ConseilQueryBuilder.addOrdering(origin, 'block_level', ConseilSortDirection.DESC);
    origin = ConseilQueryBuilder.setLimit(origin, 1000);

    let target = ConseilQueryBuilder.blankQuery();
    target = ConseilQueryBuilder.addFields(target, 'timestamp', 'source', 'destination', 'amount', 'operation_group_hash', 'delegate', 'kind');
    target = ConseilQueryBuilder.addPredicate(target, 'kind', ConseilOperator.EQ, ['transaction'], false);
    target = ConseilQueryBuilder.addPredicate(target, 'destination', ConseilOperator.EQ, [accountHash], false);
    target = ConseilQueryBuilder.addPredicate(target, 'internal', ConseilOperator.EQ, ['false'], false);
    target = ConseilQueryBuilder.addPredicate(target, 'status', ConseilOperator.EQ, ['applied'], false);
    target = ConseilQueryBuilder.addOrdering(target, 'block_level', ConseilSortDirection.DESC);
    target = ConseilQueryBuilder.setLimit(target, 1000);

    return Promise.all(
        [target, origin].map((q) => TezosConseilClient.getOperations({url: conseilUrl, apiKey, network}, network, q)))
        .then((responses) => {
            return responses.reduce((o, i) => {
                i.forEach((ii) =>
                    o.push({
                        timestamp: ii['timestamp'],
                        source: ii['source'],
                        destination: ii['destination'],
                        amount: ii['amount'],
                        opGroupHash: ii['operation_group_hash'],
                        delegate: ii['delegate'],
                        kind: ii['kind']
                    }),
                );
                return o;
            }, []);
        })
        .then((transactions) => {
            console.log(`transactions: ${JSON.stringify(transactions)}`);
            return transactions.sort((a, b) => b.timestamp - a.timestamp);
        });
};

export const getLastDelegation = async (accountHash: string) => {
    const conseilUrl = config[0].url; // TODO: read from state as an object
    const apiKey = config[0].apiKey;
    const network = config[0].network;

    let delegationQuery = ConseilQueryBuilder.blankQuery();
    delegationQuery = ConseilQueryBuilder.addFields(delegationQuery, 'timestamp', 'operation_group_hash', 'delegate', 'cycle');
    delegationQuery = ConseilQueryBuilder.addPredicate(delegationQuery, 'kind', ConseilOperator.EQ, ['delegation'], false);
    delegationQuery = ConseilQueryBuilder.addPredicate(delegationQuery, 'source', ConseilOperator.EQ, [accountHash], false);
    delegationQuery = ConseilQueryBuilder.addPredicate(delegationQuery, 'internal', ConseilOperator.EQ, ['false'], false);
    delegationQuery = ConseilQueryBuilder.addPredicate(delegationQuery, 'status', ConseilOperator.EQ, ['applied'], false);
    delegationQuery = ConseilQueryBuilder.addOrdering(delegationQuery, 'block_level', ConseilSortDirection.DESC);
    delegationQuery = ConseilQueryBuilder.setLimit(delegationQuery, 1);

    const delegation = await TezosConseilClient.getOperations({url: conseilUrl, apiKey, network}, network, delegationQuery);

    const head = await TezosConseilClient.getBlockHead({url: conseilUrl, apiKey, network}, network);

    
    const offset = Number(head['meta_cycle']) - Number(delegation[0]['cycle']);
    const expected = ((offset >= 7 + 5 ? (4 * 4096) : (12 - offset) * 4096) + (4096 - Number(head['meta_cycle_position'])) + 1) * 60 * 1000;
    console.log(`offset: ${offset}, ${expected}, ${Number(head['meta_cycle'])}, ${Number(delegation[0]['cycle'])}`)

    return {delegate: delegation[0]['delegate'], expectedPaymentDate: new Date(Date.now() + expected) };
}

export const sendTransaction = () => async (
    dispatch: Dispatch,
    getState: () => State,
) => {
    try {
        const tezosUrl = config[0].nodeUrl; // TODO: getState().config
        const address = getState().app.sendAddress; // TODO do not use state, use parameters
        const amount = getState().app.sendAmount; // TODO do not use state, use parameters
        const secretKey = getState().app.secretKey;
        const isRevealed = getState().app.revealed;
        const keyStore = await KeyStoreUtils.restoreIdentityFromSecretKey(secretKey); // TODO
        const signer = new SoftSigner(TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'));

        await TezosNodeWriter.sendTransactionOperation(
            tezosUrl,
            signer,
            keyStore,
            address,
            amount,
            isRevealed ? 1423 : 1423 + 1300, // TODO
        );
    } catch (e) {
        console.log('error-transaction', e);
    }
};

export const sendDelegation = () => async (
    dispatch: Dispatch,
    getState: () => State,
) => {
    try {
        const tezosUrl = config[0].nodeUrl; // TODO: getState().config
        const address = getState().app.delegateAddress; // TODO do not use state, use parameters
        const secretKey = getState().app.secretKey;
        const isRevealed = getState().app.revealed;
        const keyStore = await KeyStoreUtils.restoreIdentityFromSecretKey(
            secretKey,
        );
        const signer = new SoftSigner(
            TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'),
        );

        await TezosNodeWriter.sendDelegationOperation(
            tezosUrl,
            signer,
            keyStore,
            address,
            isRevealed ? 1423 : 1423 + 1300,
        );
    } catch (e) {
        console.log('error-delegation', e);
    }
};
