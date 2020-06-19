import {TezosConseilClient} from 'conseiljs';

import {setBalanceAction} from './actions';
import config from '../../config';

export const getAccount = () => async (dispatch, state) => {
    try {
        const publicKeyHash = state().app.publicKeyHash;
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
