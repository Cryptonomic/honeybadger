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

import {setBalanceAction, setRevealedAction, setTransactions} from './actions';

export const syncAccount = () => async (
    dispatch: Dispatch,
    getState: () => State,
) => {
    try {
        const publicKeyHash = getState().app.publicKeyHash;

        try {
            const balance = await TezosNodeReader.getSpendableBalanceForAccount(
                config[0].tezosNode,
                publicKeyHash,
            );
            dispatch(setBalanceAction(balance));
        } catch (balanceError) {}

        try {
            if (!getState().app.revealed) {
                const isRevealed = await TezosNodeReader.isManagerKeyRevealedForAccount(
                    config[0].url,
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

export const getTransactions = async (accountHash: string) => {
    const conseilUrl = config[0].url;
    const apiKey = config[0].apiKey;
    const network = config[0].network;

    let origin = ConseilQueryBuilder.blankQuery();
    origin = ConseilQueryBuilder.addFields(
        origin,
        'timestamp',
        'source',
        'destination',
        'amount',
        'operation_group_hash',
    );
    origin = ConseilQueryBuilder.addPredicate(
        origin,
        'kind',
        ConseilOperator.IN,
        [
            'transaction',
            //'activate_account',
            //'reveal',
            //'origination',
            'delegation',
        ],
        false,
    );
    origin = ConseilQueryBuilder.addPredicate(
        origin,
        'source',
        ConseilOperator.EQ,
        [accountHash],
        false,
    );
    origin = ConseilQueryBuilder.addPredicate(
        origin,
        'internal',
        ConseilOperator.EQ,
        ['false'],
        false,
    );
    origin = ConseilQueryBuilder.addOrdering(
        origin,
        'block_level',
        ConseilSortDirection.DESC,
    );
    origin = ConseilQueryBuilder.setLimit(origin, 1000);

    let target = ConseilQueryBuilder.blankQuery();
    target = ConseilQueryBuilder.addFields(
        target,
        'timestamp',
        'source',
        'destination',
        'amount',
        'operation_group_hash',
    );
    target = ConseilQueryBuilder.addPredicate(
        target,
        'kind',
        ConseilOperator.IN,
        [
            'transaction',
            //'activate_account',
            //'reveal',
            //'origination',
            'delegation',
        ],
        false,
    );
    target = ConseilQueryBuilder.addPredicate(
        target,
        'destination',
        ConseilOperator.EQ,
        [accountHash],
        false,
    );
    target = ConseilQueryBuilder.addPredicate(
        target,
        'internal',
        ConseilOperator.EQ,
        ['false'],
        false,
    );
    target = ConseilQueryBuilder.addOrdering(
        target,
        'block_level',
        ConseilSortDirection.DESC,
    );
    target = ConseilQueryBuilder.setLimit(target, 1000);

    return Promise.all(
        [target, origin].map((q) =>
            TezosConseilClient.getOperations(
                {url: conseilUrl, apiKey, network},
                network,
                q,
            ),
        ),
    )
        .then((responses) => {
            return responses.reduce((o, i) => {
                i.forEach((ii) =>
                    o.push({
                        timestamp: ii['timestamp'],
                        source: ii['source'],
                        destination: ii['destination'],
                        amount: ii['amount'],
                        opGroupHash: ii['operation_group_hash'],
                    }),
                );
                return o;
            }, []);
        })
        .then((transactions) => {
            console.log(JSON.stringify(transactions));
            return transactions.sort((a, b) => b.timestamp - a.timestamp);
        });
};

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
        const keyStore = await KeyStoreUtils.restoreIdentityFromSecretKey(
            secretKey,
        ); // TODO
        const signer = new SoftSigner(
            TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'),
        );

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
        const tezosUrl = config[0].url; // TODO: getState().config
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
