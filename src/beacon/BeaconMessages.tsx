import {useEffect} from 'react';
import {NativeModules, NativeEventEmitter} from 'react-native';
import {useDispatch} from 'react-redux';

import {setBeaconMessage, setBeaconPermissions, setBeaconPermissionsLoading} from '../reducers/app/actions';

import {BeaconMessageTypes, BeaconErrorTypes, BeaconSuccessTypes} from './types';
import {NavigationProps} from '../screens/types';

const BeaconMessages = ({ navigation }: NavigationProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const BeaconEmmiter = new NativeEventEmitter(NativeModules.BeaconBridge);

        BeaconEmmiter.addListener('onMessage', response => {
            try {
                const beaconMessage = JSON.parse(response);
                console.log('BEACON_MESSAGE', beaconMessage);

                if (beaconMessage.type === BeaconMessageTypes.PERMISSION_REQUEST) {
                    dispatch(setBeaconPermissionsLoading());
                    dispatch(setBeaconMessage(beaconMessage));
                    navigation.navigate('BeaconPermissionsRequest');
                }

                if (beaconMessage.type === BeaconMessageTypes.OPERATION_REQUEST) {
                    console.log('beacon_operation', beaconMessage);
                    dispatch(setBeaconMessage(beaconMessage));
                    navigation.navigate('BeaconAuthorization');
                }

            } catch (error) {
                console.log('Failed to get message', error);
            }
        });

        BeaconEmmiter.addListener('onSuccess', response => {
            try {
                if (response.type === BeaconSuccessTypes.START_BEACON) {
                    console.log('StartBeacon Success')
                    NativeModules.BeaconBridge.getPermissions();
                    NativeModules.BeaconBridge.getAppMetadata();
                    return;
                }

                if (response.type === BeaconSuccessTypes.GET_APP_METADATA) {
                    const appMetadata = JSON.parse(response.data);
                    console.log('BeaconAppMetadata', appMetadata);
                    return;
                }

                if (response.type === BeaconSuccessTypes.GET_PERMISSIONS) {
                    const permissions = JSON.parse(response.data);
                    console.log('BeaconPermissions', permissions);
                    dispatch(setBeaconPermissions(permissions));
                    return;
                }

                if (response.type === BeaconSuccessTypes.GET_PEERS) {
                    const peers = JSON.parse(response.data);
                    console.log('BeaconPeers', peers);
                    return;
                }

                if (response.type === BeaconSuccessTypes.PERMISSION_SUCCESS) {
                    dispatch(setBeaconPermissionsLoading());
                    navigation.navigate('Account');
                    return;
                }
            } catch (error) {
                console.log('Failed to get message', error);
            }
        });

        BeaconEmmiter.addListener('onError', response => {
            try {
                console.log('BEACON_ERROR', response);

                if (response.type === BeaconErrorTypes.ADD_PEER_ERROR) {

                }
            } catch (error) {
                console.log('Failed to get error', error);
            }
        });

        try {
            NativeModules.BeaconBridge.startBeacon();
        } catch (error) {
            console.log("Failed to init BeaconBridge", error);
            return;
        }
    }, []);

    return null;
}

export default BeaconMessages;
