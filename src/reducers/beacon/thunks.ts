import {TezosNodeWriter, TezosMessageUtils} from 'conseiljs';
import {KeyStoreUtils, SoftSigner} from '../../softsigner';

import {State} from '../types';

import constants from '../../utils/constants.json';
import config from '../../config';

import {getPendingOperations} from '../app/thunks';

export const beaconSendTransaction =
    (
        destination: string,
        amount: number,
        navigation: {navigate: (target: string, params?: any) => void},
    ) =>
    async (dispatch: any, getState: () => State) => {
        try {
            const tezosUrl = config[0].nodeUrl;
            const secretKey = getState().app.secretKey;
            const isRevealed = getState().app.revealed;
            const keyStore = await KeyStoreUtils.restoreIdentityFromSecretKey(
                secretKey,
            );
            const signer = new SoftSigner(
                TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'),
            );

            await TezosNodeWriter.sendTransactionOperation(
                tezosUrl,
                signer,
                keyStore,
                destination,
                amount,
                isRevealed
                    ? constants.fees.simpleTransaction
                    : constants.fees.simpleTransaction + constants.fees.reveal,
            );

            await dispatch(getPendingOperations());
            navigation.navigate('Account');
        } catch (e) {
            console.log('error-transaction', e);
            navigation.navigate('Account');
        }
    };

export const beaconSendDelegation =
    (
        destination: string,
        navigation: {navigate: (target: string, params?: any) => void},
    ) =>
    async (dispatch: any, getState: () => State) => {
        try {
            const tezosUrl = config[0].nodeUrl;
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
                destination,
                isRevealed
                    ? constants.fees.delegation
                    : constants.fees.delegation + constants.fees.reveal,
            );

            await dispatch(getPendingOperations());
            navigation.navigate('Account');
        } catch (e) {
            console.log('error-delegation', e);
            navigation.navigate('Account');
        }
    };
