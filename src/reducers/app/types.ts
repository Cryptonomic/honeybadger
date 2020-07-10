import {KeyStore} from 'conseiljs';
import {
    SET_TRANSACTIONS,
    SET_BALANCE,
    SET_KEYS,
    SET_SEND_STEP,
    SET_SEND_ADDRESS,
    SET_SEND_AMOUNT,
    SET_TERMS_DATE,
    SET_REVEALED,
} from './actions';
import {Operation} from '../types';

export interface State {
    publicKey: string;
    secretKey: string;
    publicKeyHash: string;
    storeType: string | number;
    seed: string;
    balance: number;
    revealed: boolean;
    sendStep: number;
    sendAddress: string;
    sendAmount: number;
    transactions: Array<Operation>;
    delegations: Array<{}>;
    termsDate: string;
}

export interface SetKeysAction {
    type: typeof SET_KEYS;
    keys: KeyStore;
}

export interface SetBalanceAction {
    type: typeof SET_BALANCE;
    balance: number;
}

export interface SetRevealedAction {
    type: typeof SET_REVEALED;
    revealed: boolean;
}

export interface SetTransactionsAction {
    type: typeof SET_TRANSACTIONS;
    transactions: Operation[];
}

export interface SetSendStepAction {
    type: typeof SET_SEND_STEP;
    step: number;
}

export interface SetSendAddressAction {
    type: typeof SET_SEND_ADDRESS;
    address: string;
}

export interface SetSendAmountAction {
    type: typeof SET_SEND_AMOUNT;
    amount: number;
}

export interface SetTermsDateAction {
    type: typeof SET_TERMS_DATE;
    date: string;
}

export type AppActions =
    | SetTransactionsAction
    | SetBalanceAction
    | SetRevealedAction
    | SetKeysAction
    | SetSendStepAction
    | SetSendAddressAction
    | SetSendAmountAction
    | SetTermsDateAction;
