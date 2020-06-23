export const SET_KEYS = 'SET_KEYS';
export const SET_BALANCE = 'SET_BALANCE';
export const SET_SEND_STEP = 'SET_SEND_STEP';
export const SET_SEND_ADDRESS = 'SET_SEND_ADDRESS';

export const setKeysAction = (keys) => ({
    type: SET_KEYS,
    keys,
});

export const setBalanceAction = (balance) => ({
    type: SET_BALANCE,
    balance,
});

export const setSendStepAction = (step) => ({
    type: SET_SEND_STEP,
    step,
});

export const setSendAddress = (address: string) => ({
    type: SET_SEND_ADDRESS,
    address,
});
