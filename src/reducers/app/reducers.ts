import {AppActions} from './types';

import {
    SET_KEYS,
    SET_BALANCE,
    SET_SEND_STEP,
    SET_SEND_ADDRESS,
    SET_TRANSACTIONS,
    SET_SEND_AMOUNT,
} from './actions';

const initialState = {
    publicKey: null,
    secretKey: null,
    publicKeyHash: null,
    storeType: '',
    seed: '',
    balance: 0,
    transactions: [],
    delegations: [],
    sendStep: 1,
    sendAddress: '',
    sendAmount: 0,
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
        case SET_SEND_STEP:
            return {...state, sendStep: action.step};
        case SET_SEND_ADDRESS:
            return {...state, sendAddress: action.address};
        case SET_SEND_AMOUNT:
            return {...state, sendAmount: action.amount};
        case SET_TRANSACTIONS:
            return {...state, transactions: action.transactions};
        default:
            return state;
    }
};

export default app;
