import {Transaction} from 'conseiljs';
import {
    SET_TRANSACTIONS,
    SET_BALANCE,
    SET_KEYS,
    SET_SEND_STEP,
    SET_SEND_ADDRESS,
} from './actions';

export interface State {
    publicKey: string;
    secretKey: string;
    publicKeyHash: string;
    storeType: string;
    seed: string;
    balance: number;
    sendStep: number;
    sendAddress: string;
    transactions: Array<Transaction>;
    delegations: Array<{}>;
}

export interface Keys {
    publicKey: string;
    secretKey: string;
    publicKeyHash: string;
    storeType: string;
    seed: string;
}

export interface SetKeysAction {
    type: typeof SET_KEYS;
    keys: Keys;
}

export interface SetBalanceAction {
    type: typeof SET_BALANCE;
    balance: number;
}
export interface SetTransactionsAction {
    type: typeof SET_TRANSACTIONS;
    transactions: Transaction[];
}

export interface SetSendStepAction {
    type: typeof SET_SEND_STEP;
    step: number;
}

export interface SetSendAddress {
    type: typeof SET_SEND_ADDRESS;
    address: string;
}

export type AppActions =
    | SetTransactionsAction
    | SetBalanceAction
    | SetKeysAction
    | SetSendStepAction
    | SetSendAddress;
