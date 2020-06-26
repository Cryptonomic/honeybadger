import {Action} from 'redux';

import {
    SET_KEYS,
    SET_BALANCE,
    SET_SEND_STEP,
    SET_SEND_ADDRESS,
} from './actions';

const initialState = {
    publicKey: null,
    secretKey: null,
    publicKeyHash: null,
    storeType: '',
    seed: '',
    balance: 0,
    sendStep: 1,
    sendAddress: '',
};

const app = (state = initialState, action: Action) => {
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
        default:
            return state;
    }
};

export default app;
