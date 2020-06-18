export const SET_KEYS = 'SET_KEYS';
export const SET_BALANCE = 'SET_BALANCE';

export const setKeysAction = keys => ({
    type: SET_KEYS,
    keys,
});

export const setBalanceAction = balance => ({
    type: SET_BALANCE,
    balance,
});
