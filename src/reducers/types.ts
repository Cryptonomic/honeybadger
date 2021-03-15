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

export interface BeaconErrorMessage {
    type: string;
    message: string;
}

export enum BeaconErrorTypes {
    ADD_PEER_ERROR = 'ADD_PEER_ERROR',
}

export enum BeaconMessageTypes {
     PERMISSION_REQUEST = 'permission_request',
     OPERATION_REQUEST = 'operation_request',
}

export enum BeaconSuccessTypes {
    PERMISSION_SUCCESS = 'permission_success'
}
