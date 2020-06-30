import {Transaction} from 'conseiljs';
import {
    SetTransactionsAction,
    SetBalanceAction,
    SetKeysAction,
    SetSendStepAction,
    Keys,
} from './types';

export const SET_KEYS = 'SET_KEYS';
export const SET_BALANCE = 'SET_BALANCE';
export const SET_SEND_STEP = 'SET_SEND_STEP';
export const SET_SEND_ADDRESS = 'SET_SEND_ADDRESS';
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS';

export const setKeysAction = (keys: Keys): SetKeysAction => ({
    type: SET_KEYS,
    keys,
});

export const setBalanceAction = (balance: number): SetBalanceAction => ({
    type: SET_BALANCE,
    balance,
});

export const setSendStepAction = (step: number): SetSendStepAction => ({
    type: SET_SEND_STEP,
    step,
});

export const setSendAddress = (address: string) => ({
    type: SET_SEND_ADDRESS,
    address,
});

export const setTransactions = (
    transactions: Transaction[],
): SetTransactionsAction => ({
    type: SET_TRANSACTIONS,
    transactions,
});
