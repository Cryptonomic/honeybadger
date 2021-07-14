import {
    TezosNodeWriter,
    TezosMessageUtils,
    TezosNodeReader,
    TezosConstants,
    Delegation,
} from 'conseiljs';
import {KeyStoreUtils, SoftSigner} from '../../softsigner';

import {State} from '../types';

import constants from '../../utils/constants.json';
import config from '../../config';

import {getPendingOperations} from '../app/thunks';

import {setMessage} from '../messages/actions';

import {clearOperationId} from '../../utils/general';

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

export const beaconSendOperations =
    (operations: any[], fee: number = 0) =>
    async (dispatch: any, getState: any): Promise<boolean> => {
        const secretKey = getState().app.secretKey;
        const publicKeyHash = getState().app.publicKeyHash;
        const tezosUrl = config[0].nodeUrl;
        const keyStore = await KeyStoreUtils.restoreIdentityFromSecretKey(
            secretKey,
        );
        const signer = new SoftSigner(
            TezosMessageUtils.writeKeyWithHint(keyStore.secretKey, 'edsk'),
        );

        const formedOperations = await createOperationGroup(
            operations,
            tezosUrl,
            publicKeyHash,
            keyStore.publicKey,
        );

        const estimate = await TezosNodeWriter.estimateOperationGroup(
            tezosUrl,
            'main',
            formedOperations,
        );

        for (let i = 0; i < formedOperations.length; i++) {
            if (i === 0 && fee === 0) {
                formedOperations[i].fee = estimate.estimatedFee.toString();
            } else if (i === 0 && fee > 0) {
                formedOperations[i].fee = fee.toString();
            }

            formedOperations[i].gas_limit =
                estimate.operationResources[i].gas.toString();
            formedOperations[i].storage_limit =
                estimate.operationResources[i].storageCost.toString();
        }

        const result: any = await TezosNodeWriter.sendOperation(
            tezosUrl,
            formedOperations,
            signer,
        ).catch(err => {
            const errorObj = {name: err.message, ...err};
            console.log(err);
            dispatch(setMessage(errorObj.name, 'error'));
            return undefined;
        });

        if (result) {
            const operationResult =
                result &&
                result.results &&
                result.results.contents &&
                result.results.contents[0] &&
                result.results.contents[0].metadata &&
                result.results.contents[0].metadata.operation_result;

            if (
                operationResult &&
                operationResult.errors &&
                operationResult.errors.length
            ) {
                const error = 'Smart Contract operation failed';
                console.log(
                    'processOperationResult failed with',
                    operationResult.errors,
                );
                dispatch(setMessage(error, 'error'));
                return false;
            }

            const clearedOperationId = clearOperationId(
                result.operationGroupID,
            );
            dispatch(
                setMessage(
                    `Successfully started contract invocation. ${clearedOperationId}`,
                    'info',
                ),
            );

            return true;
        }

        return false;
    };

async function createOperationGroup(
    operations: any[],
    tezosUrl: string,
    publicKeyHash: string,
    publicKey: string,
) {
    const networkCounter = await TezosNodeReader.getCounterForAccount(
        tezosUrl,
        publicKeyHash,
    );
    const formedOperations: any[] = [];

    let counter = networkCounter;
    for (const o of operations) {
        counter += 1;
        console.log('createOperationGroup', operations);
        switch (o.kind) {
            case 'transaction': {
                let entrypoint: string | undefined;
                let parameters: string | undefined;

                try {
                    entrypoint = o.parameters.entrypoint;
                } catch {
                    //
                }

                try {
                    parameters = JSON.stringify(o.parameters.value);
                } catch {
                    //
                }

                const op = TezosNodeWriter.constructContractInvocationOperation(
                    publicKeyHash,
                    counter,
                    o.destination,
                    o.amount,
                    0,
                    TezosConstants.OperationStorageCap,
                    TezosConstants.OperationGasCap,
                    entrypoint,
                    parameters,
                );

                formedOperations.push(op);

                break;
            }
            case 'delegation': {
                const op: Delegation = {
                    kind: 'delegation',
                    source: publicKeyHash,
                    fee: '0',
                    counter: counter.toString(),
                    storage_limit:
                        TezosConstants.DefaultDelegationStorageLimit.toString(),
                    gas_limit:
                        TezosConstants.DefaultDelegationGasLimit.toString(),
                    delegate: o.delegate,
                };

                formedOperations.push(op);

                break;
            }
            default: {
                break;
            }
        }
    }

    return await TezosNodeWriter.appendRevealOperation(
        tezosUrl,
        publicKey,
        publicKeyHash,
        networkCounter,
        formedOperations,
    );
}
