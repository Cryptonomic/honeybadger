import {BeaconState, BeaconActions} from './types';

import {
    SET_BEACON_MESSAGE,
    SET_BEACON_PERMISSIONS,
    SET_BEACON_METADATA,
    SET_BEACON_PERMISSIONS_LOADING,
    SET_BEACON_ERROR_MESSAGE,
} from './actions';

const initialState: BeaconState = {
    beaconMessage: {},
    beaconPermissions: [],
    beaconMetadata: [],
    beaconPermissionLoading: false,
    beaconErrorMessage: null,
};

const beacon = (state = initialState, action: BeaconActions) => {
    switch (action.type) {
        case SET_BEACON_MESSAGE:
            return {...state, beaconMessage: action.beaconMessage};
        case SET_BEACON_PERMISSIONS:
            return {...state, beaconPermissions: action.beaconPermissions};
        case SET_BEACON_METADATA:
            return {...state, beaconMetadata: action.beaconMetadata};
        case SET_BEACON_PERMISSIONS_LOADING:
            return {
                ...state,
                beaconPermissionLoading: action.beaconPermissionLoading,
            };
        case SET_BEACON_ERROR_MESSAGE:
            return {...state, beaconErrorMessage: action.beaconErrorMessage};
        default:
            return state;
    }
};

export default beacon;
