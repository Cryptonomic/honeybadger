import {AppActions} from './types';

import {
    SET_KEYS,
    SET_BALANCE,
    SET_SEND_STEP,
    SET_SEND_ADDRESS,
    SET_TRANSACTIONS,
    SET_SEND_AMOUNT,
    SET_TERMS_DATE,
    SET_DELEGATE_ADDRESS,
    SET_REVEALED,
    SET_DELEGATION,
    SET_EXPECTEDDELEGATEDATE,
    SET_PENDING_OPERATIONS,
    SET_BEACON_MESSAGE,
    SET_BEACON_PERMISSIONS,
    SET_BEACON_METADATA,
    SET_BEACON_PERMISSIONS_LOADING,
    SET_BEACON_ERROR_MESSAGE,
} from './actions';

const initialState = {
    publicKey: null,
    secretKey: null,
    publicKeyHash: null,
    storeType: '',
    seed: '',
    balance: 0,
    revealed: false,
    transactions: [],
    delegation: [],
    sendStep: 1,
    sendAddress: '',
    sendAmount: 0,
    termsDate: '',
    delegateAddress: '',
    expectedPaymentDate: null,
    pendingTransactions: [],
    pendingDelegations: [],
    beaconMessage: {},
    beaconPermissions: [],
    beaconMetadata: [],
    beaconPermissionLoading: false,
    beaconErrorMessage: null,
};

const app = (state = initialState, action: AppActions) => {
    switch (action.type) {
        case SET_KEYS:
            const {
                publicKey,
                secretKey,
                publicKeyHash,
                storeType,
                seed,
            } = action.keys;
            return {
                ...state,
                publicKey,
                secretKey,
                publicKeyHash,
                storeType,
                seed,
            };
        case SET_BALANCE:
            return {...state, balance: action.balance};
        case SET_REVEALED:
            return {...state, revealed: action.revealed};
        case SET_SEND_STEP:
            return {...state, sendStep: action.step};
        case SET_SEND_ADDRESS:
            return {...state, sendAddress: action.address};
        case SET_SEND_AMOUNT:
            return {...state, sendAmount: action.amount};
        case SET_TRANSACTIONS:
            return {...state, transactions: action.transactions};
        case SET_TERMS_DATE:
            return {...state, termsDate: action.date};
        case SET_DELEGATE_ADDRESS:
            return {...state, delegateAddress: action.address};
        case SET_DELEGATION:
            return {...state, delegation: action.delegation};
        case SET_EXPECTEDDELEGATEDATE:
            return {...state, expectedPaymentDate: action.date};
        case SET_PENDING_OPERATIONS:
            return {...state, pendingTransactions: action.transactions, pendingDelegations: action.delegations};
        case SET_BEACON_MESSAGE:
            return {...state, beaconMessage: action.beaconMessage};
        case SET_BEACON_PERMISSIONS:
            return {...state, beaconPermissions: action.beaconPermissions};
        case SET_BEACON_METADATA:
            return {...state, beaconMetadata: action.beaconMetadata};
        case SET_BEACON_PERMISSIONS_LOADING:
            return {...state, beaconPermissionLoading: action.beaconPermissionLoading};
        case SET_BEACON_ERROR_MESSAGE:
            return {...state, beaconErrorMessage: action.beaconErrorMessage};
        default:
            return state;
    }
};

export default app;
