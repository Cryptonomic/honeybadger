import {KeyStore} from 'conseiljs';
import {
    SetTransactionsAction,
    SetBalanceAction,
    SetRevealedAction,
    SetKeysAction,
    SetSendStepAction,
    SetSendAddressAction,
    SetSendAmountAction,
    SetTermsDateAction,
    SetDelegateAddressAction,
    SetDelegationAction,
    SetDelegationExpectedDate,
    SetPendingOperationsAction,
} from './types';
import {Operation} from '../types';
import {BeaconErrorMessage} from '../../beacon/types';

export const SET_KEYS = 'SET_KEYS';
export const SET_BALANCE = 'SET_BALANCE';
export const SET_REVEALED = 'SET_REVEALED';
export const SET_SEND_STEP = 'SET_SEND_STEP';
export const SET_SEND_ADDRESS = 'SET_SEND_ADDRESS';
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
export const SET_SEND_AMOUNT = 'SET_SEND_AMOUNT';
export const SET_TERMS_DATE = 'SET_TERMS_DATE';
export const SET_DELEGATE_ADDRESS = 'SET_DELEGATE_ADDRESS';
export const SET_DELEGATION = 'SET_DELEGATION';
export const SET_EXPECTEDDELEGATEDATE = 'SET_EXPECTEDDELEGATEDATE';
export const SET_PENDING_OPERATIONS = 'SET_PENDING_OPERATIONS';
export const SET_BEACON_MESSAGE = 'SET_BEACON_MESSAGE';
export const SET_BEACON_PERMISSIONS = 'SET_BEACON_PERMISSIONS';
export const SET_BEACON_METADATA = 'SET_BEACON_METADATA';
export const SET_BEACON_PERMISSIONS_LOADING = 'SET_BEACON_PERMISSIONS_LOADING';
export const SET_BEACON_ERROR_MESSAGE = 'SET_BEACON_ERROR_MESSAGE';

export const setBeaconMessage = (beaconMessage: any = {}) => ({
    type: SET_BEACON_MESSAGE,
    beaconMessage
});

export const setBeaconPermissions = (beaconPermissions: any = []) => ({
    type: SET_BEACON_PERMISSIONS,
    beaconPermissions,
});

export const setBeaconMetadata = (beaconMetadata: any = []) => ({
    type: SET_BEACON_METADATA,
    beaconMetadata,
});

export const setBeaconPermissionsLoading = (beaconPermissionLoading: boolean = false) => ({
    type: SET_BEACON_PERMISSIONS_LOADING,
    beaconPermissionLoading,
});

export const setBeaconErrorMessage = (beaconErrorMessage: BeaconErrorMessage | null = null) => ({
    type: SET_BEACON_ERROR_MESSAGE,
    beaconErrorMessage,
});

export const setKeysAction = (keys: KeyStore): SetKeysAction => ({
    type: SET_KEYS,
    keys,
});

export const setBalanceAction = (balance: number): SetBalanceAction => ({
    type: SET_BALANCE,
    balance,
});

export const setRevealedAction = (revealed: boolean): SetRevealedAction => ({
    type: SET_REVEALED,
    revealed,
});

export const setSendStepAction = (step: number): SetSendStepAction => ({
    type: SET_SEND_STEP,
    step,
});

export const setSendAddress = (address: string): SetSendAddressAction => ({
    type: SET_SEND_ADDRESS,
    address,
});

export const setSendAmount = (amount: number): SetSendAmountAction => ({
    type: SET_SEND_AMOUNT,
    amount,
});

export const setTransactions = (transactions: Operation[]): SetTransactionsAction => ({
    type: SET_TRANSACTIONS,
    transactions,
});

export const setDelegateAddress = (
    address: string,
): SetDelegateAddressAction => ({
    type: SET_DELEGATE_ADDRESS,
    address,
});

export const setTermsDate = (date: string): SetTermsDateAction => ({
    type: SET_TERMS_DATE,
    date,
});

export const setDelegation = (delegation: string): SetDelegationAction => ({
    type: SET_DELEGATION,
    delegation,
});

export const setDelegateExpectedDate = (date: Date): SetDelegationExpectedDate => ({
    type: SET_EXPECTEDDELEGATEDATE,
    date
});

export const setPendingOperations = (transactions: any[], delegations: any[]): SetPendingOperationsAction => ({
    type: SET_PENDING_OPERATIONS,
    transactions,
    delegations
})
