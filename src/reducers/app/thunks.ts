import {
    ConseilQueryBuilder,
    ConseilOperator,
    ConseilSortDirection,
    TezosConseilClient,
    TezosNodeWriter,
    TezosMessageUtils,
} from 'conseiljs';
import {Dispatch} from 'redux';

import {setBalanceAction, setTransactions} from './actions';
import config from '../../config';
import {KeyStoreUtils, SoftSigner} from '../../softsigner';

import {State} from '../types';

const {sendTransactionOperation} = TezosNodeWriter;

export const syncAccount = () => async (
    dispatch: Dispatch,
    getState: () => State,
) => {
    try {
        const publicKeyHash = getState().app.publicKeyHash;
        const account = await TezosConseilClient.getAccount(
            config[0],
            config[0].network,
            publicKeyHash,
        );
        if (account) {
            dispatch(setBalanceAction(account.balance));
            const transactions = await getTransactions(publicKeyHash);
            dispatch(setTransactions(transactions));
        }
    } catch (e) {}
};

export const getTransactions = async (accountHash: string) => {
    const conseilUrl = config[0].url;
    const apiKey = config[0].apiKey;
    const network = config[0].network;

    let origin = ConseilQueryBuilder.blankQuery();
    origin = ConseilQueryBuilder.addPredicate(
        origin,
        'kind',
        ConseilOperator.IN,
        [
            'transaction',
            'activate_account',
            'reveal',
            'origination',
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
    target = ConseilQueryBuilder.addPredicate(
        target,
        'kind',
        ConseilOperator.IN,
        [
            'transaction',
            'activate_account',
            'reveal',
            'origination',
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
            return responses.reduce((result, r) => {
                r.forEach((rr) => result.push(rr));
                return result;
            });
        })
        .then((transactions) =>
            transactions.sort((a, b) => b.timestamp - a.timestamp),
        );
};

export const sendTransaction = () => async (
    dispatch: Dispatch,
    getState: () => State,
) => {
    try {
        const tezosUrl = 'https://tezos-dev.cryptonomic-infra.tech:443';
        const address = getState().app.sendAddress;
        const amount = getState().app.sendAmount;
        const secretKey = getState().app.secretKey;
        const keyStore = await KeyStoreUtils.restoreIdentityFromSecretKey(
            secretKey,
        );
        const signer = new SoftSigner(
            TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'),
        );
        await sendTransactionOperation(
            tezosUrl,
            signer,
            keyStore,
            address,
            amount,
            2427,
        );
    } catch (e) {
        console.log('error-transaction', e);
    }
};
