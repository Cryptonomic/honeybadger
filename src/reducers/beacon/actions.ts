import {BeaconErrorMessage} from '../../beacon/types';

export const SET_BEACON_STATUS = 'SET_BEACON_STATUS';
export const SET_BEACON_MESSAGE = 'SET_BEACON_MESSAGE';
export const SET_BEACON_PERMISSIONS = 'SET_BEACON_PERMISSIONS';
export const SET_BEACON_METADATA = 'SET_BEACON_METADATA';
export const SET_BEACON_PERMISSIONS_LOADING = 'SET_BEACON_PERMISSIONS_LOADING';
export const SET_BEACON_ERROR_MESSAGE = 'SET_BEACON_ERROR_MESSAGE';

export const setBeaconStatus = (beaconReady: boolean = false) => ({
    type: SET_BEACON_STATUS,
    beaconReady,
});

export const setBeaconMessage = (beaconMessage: any = {}) => ({
    type: SET_BEACON_MESSAGE,
    beaconMessage,
});

export const setBeaconPermissions = (beaconPermissions: any = []) => ({
    type: SET_BEACON_PERMISSIONS,
    beaconPermissions,
});

export const setBeaconMetadata = (beaconMetadata: any = []) => ({
    type: SET_BEACON_METADATA,
    beaconMetadata,
});

export const setBeaconPermissionsLoading = (
    beaconPermissionLoading: boolean = false,
) => ({
    type: SET_BEACON_PERMISSIONS_LOADING,
    beaconPermissionLoading,
});

export const setBeaconErrorMessage = (
    beaconErrorMessage: BeaconErrorMessage | null = null,
) => ({
    type: SET_BEACON_ERROR_MESSAGE,
    beaconErrorMessage,
});
