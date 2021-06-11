import {BeaconErrorMessage} from '../../beacon/types';

import {
    SET_BEACON_MESSAGE,
    SET_BEACON_PERMISSIONS,
    SET_BEACON_METADATA,
    SET_BEACON_PERMISSIONS_LOADING,
    SET_BEACON_ERROR_MESSAGE,
} from './actions';

export interface BeaconState {
    beaconMessage: any;
    beaconPermissions: any;
    beaconMetadata: any;
    beaconPermissionLoading: boolean;
    beaconErrorMessage: BeaconErrorMessage | null;
}

export interface BeaconErrorMessageAction {
    type: typeof SET_BEACON_ERROR_MESSAGE;
    beaconErrorMessage: BeaconErrorMessage | null;
}
export interface BeaconPermissionLoadingAction {
    type: typeof SET_BEACON_PERMISSIONS_LOADING;
    beaconPermissionLoading: boolean;
}
export interface BeaconMessageAction {
    type: typeof SET_BEACON_MESSAGE;
    beaconMessage: any;
}

export interface BeaconPermissionsAction {
    type: typeof SET_BEACON_PERMISSIONS;
    beaconPermissions: any;
}

export interface BeaconMetadataAction {
    type: typeof SET_BEACON_METADATA;
    beaconMetadata: any;
}

export type BeaconActions =
    | BeaconMessageAction
    | BeaconPermissionsAction
    | BeaconMetadataAction
    | BeaconPermissionLoadingAction
    | BeaconErrorMessageAction;
