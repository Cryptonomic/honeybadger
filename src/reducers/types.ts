import {State as AppState} from './app/types';

export interface State {
    app: AppState;
}

export interface Operation {
    timestamp: number;
    source: string;
    destination: string;
    amount?: number;
}
