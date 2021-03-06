import {State as AppState} from './app/types';
import {MessagesState} from './messages/types';

export interface State {
    app: AppState;
    messages: MessagesState;
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
