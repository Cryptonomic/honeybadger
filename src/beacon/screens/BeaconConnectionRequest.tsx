import {View} from 'native-base';
import * as React from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, StyleSheet, TouchableOpacity, NativeModules} from 'react-native';
import {RNCamera} from 'react-native-camera';
import bs58check from 'bs58check';

import SafeContainer from '../../components/SafeContainer';
import CustomHeader from '../../components/CustomHeader';

import {setBeaconPermissionsLoading} from '../../reducers/app/actions';

import {State} from '../../reducers/types';
import {BeaconConnectionRequestProps} from '../../screens/types';

interface displayDataProps {
    //PeerInfo
    id: string;
    type: string;
    name: string;
    version: string;
    publicKey: string;
    relayServer: string;
}

const testData = {"id":"72fb2dde-d84d-8baa-659d-683b58c74e2d","type":"p2p-pairing-request","name":"Beacon Example Dapp","version":"2","publicKey":"520cf34c53803773f044af9d4ee6a052f9909a2042bcab1dced053b52facb1a0","relayServer":"matrix.papers.tech"}

const BeaconConnectionRequest = ({
    navigation,
}: BeaconConnectionRequestProps) => {
    const dispatch = useDispatch();
    const beaconPermissionLoading = useSelector(
        (state: State) => state.app.beaconPermissionLoading,
    );
    const [showCamera, setShowCamera] = useState(false);
    const [data, setData] = useState<displayDataProps | null>(testData);
    const [error, setError] = useState('');

    const onBarcodeRecognized = ({data}: {data: string}) => {
        if (data && data.length) {
            const parsedData = JSON.parse(
                bs58check.decode(
                    data.slice(data.indexOf('data=') + 'data='.length),
                ),
            );
            setData(parsedData);
            setShowCamera(false);
        }
    };

    const onCancel = () => {
        navigation.navigate('Account');
        setShowCamera(false);
        setData(null);
        setError('');
    };

    const onConnect = async () => {
        try {
            if (data === null) {
                return;
            }
            dispatch(setBeaconPermissionsLoading(true));
            NativeModules.BeaconBridge.addPeer(
                data.id,
                data.name,
                data.publicKey,
                data.relayServer,
                data.version,
            );
        } catch (e) {
            dispatch(setBeaconPermissionsLoading());
            // TODO: set and display error message
            console.log('Failed to add peer');
        }
    };

    const btn = {
        size: 30,
        color: '#ffffff',
    };

    return (
        <>
            {showCamera && (
                <RNCamera
                    captureAudio={false}
                    onBarCodeRead={onBarcodeRecognized}
                    style={s.camera}>
                    <CustomHeader
                        onBack={onCancel}
                        leftIconName="Cancel"
                        backIconCustomStyles={btn}
                    />
                </RNCamera>
            )}
            {!showCamera && data && (
                <View style={s.container}>
                    <SafeContainer>
                        {beaconPermissionLoading && (
                            <View style={s.loading}>
                                <Text>Loading...</Text>
                            </View>
                        )}
                        <Text style={s.title}>Connection Request</Text>
                        <Text style={[s.network, s.p1]}>{data?.name}</Text>
                        <Text style={[s.address, s.p1]}>{data.publicKey}</Text>
                        <Text
                            style={[
                                s.message,
                                s.p2,
                            ]}>{`${data.name} would like to connect to your account`}</Text>
                        <Text style={[s.info]}>
                            This site is requesting access to view your account
                            address. Always make sure you trust the sites you
                            interact with.
                        </Text>
                        <View style={s.buttons}>
                            <TouchableOpacity onPress={onCancel} style={s.btn}>
                                <Text style={s.btnTxt}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onConnect}
                                style={[s.btn, s.btnBg]}>
                                <Text style={[s.btnTxt, s.whiteTxt]}>
                                    Connect
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeContainer>
                </View>
            )}
        </>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    camera: {
        flex: 1,
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 24,
        textAlign: 'center',
        color: '#323232',
        marginTop: 30,
    },
    p1: {
        fontFamily: 'Roboto',
        fontWeight: '300',
        fontSize: 16,
        lineHeight: 19,
        color: '#323232',
    },
    p2: {
        fontFamily: 'Roboto',
        fontSize: 18,
        lineHeight: 19,
        color: '#323232',
    },
    network: {
        marginTop: 100,
        textAlign: 'center',
        paddingHorizontal: 24,
    },
    address: {
        marginTop: 4,
        textAlign: 'center',
        paddingHorizontal: 24,
    },
    message: {
        marginTop: 32,
        textAlign: 'center',
        paddingHorizontal: 24,
    },
    info: {
        fontFamily: 'Roboto',
        fontWeight: '300',
        fontSize: 16,
        lineHeight: 19,
        color: '#323232',
        marginTop: 150,
        paddingHorizontal: 24,
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginTop: 'auto',
        marginBottom: 40,
    },
    btn: {
        width: 156,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#979797',
    },
    btnBg: {
        backgroundColor: '#4B4B4B',
    },
    btnTxt: {
        fontFamily: 'Roboto',
        fontSize: 16,
        lineHeight: 19,
        color: '#0F0C02',
    },
    whiteTxt: {
        color: 'white',
    },
    loading: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.8)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BeaconConnectionRequest;
