export interface State {
    publicKey: string;
    secretKey: string;
    publicKeyHash: string;
    storeType: string;
    seed: string;
    balance: number;
    sendStep: number;
    sendAddress: string;
    transactions: Array<{}>;
    delegations: Array<{}>;
}

export interface Transaction {
    from?: string;
    to?: string;
    time?: number;
    value?: number;
}
