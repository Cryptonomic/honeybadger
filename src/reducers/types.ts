import {State as AppState} from './app/types';

export interface State {
    app: AppState;
}

export interface Operation {
    timestamp: number;
    kind: string; // TODO: enum
    source: string;
    destination: string;
    amount?: number;
    opGroupHash: string;
    delegate?: string;
    //status: string;
}

export interface BakerInfo {
    address: string;
    name: string;
    logoUrl: string;
    fee: number;
    estimatedRoi: number;
}
