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
    transactions: [
        {
            from: 'tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk',
            time: '1593435025908',
            value: 5.568,
        },
        {
            to: 'tz1irJKkXS2DBWkU1NnmFQx1c1L7pbGg4yhk',
            time: '1593435096536',
            value: 25.568,
        },
    ],
    delegations: [],
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
