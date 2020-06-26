import {TezosConseilClient} from 'conseiljs';
import {Dispatch} from 'redux';

import {setBalanceAction} from './actions';
import config from '../../config';

import {State} from '../types';

export const getAccount = () => async (
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
        }
    } catch (e) {}
};
