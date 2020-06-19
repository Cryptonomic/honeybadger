import {SET_KEYS, SET_BALANCE, SET_SEND_STEP} from './actions';

const initialState = {
    publicKey: null,
    secretKey: null,
    publicKeyHash: null,
    balance: 0,
    sendStep: 1,
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case SET_KEYS:
            const {publicKey, secretKey, publicKeyHash} = action.keys;
            return {...state, publicKey, secretKey, publicKeyHash};
        case SET_BALANCE:
            return {...state, balance: action.balance};
        case SET_SEND_STEP:
            return {...state, sendStep: action.step};
        default:
            return state;
    }
};

export default app;
