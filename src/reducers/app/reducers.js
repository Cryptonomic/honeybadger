import {SET_KEYS, SET_BALANCE} from './actions';

const initialState = {
    publicKey: null,
    secretKey: null,
    publicKeyHash: null,
    balance: 0,
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case SET_KEYS:
            const {publicKey, secretKey, publicKeyHash} = action.keys;
            return {...state, publicKey, secretKey, publicKeyHash};
        case SET_BALANCE:
            return {...state, balance: action.balance};
        default:
            return state;
    }
};

export default app;
