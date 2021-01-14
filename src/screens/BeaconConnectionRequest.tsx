import {View} from 'native-base';
import * as React from 'react';
import {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';

import SafeContainer from '../components/SafeContainer';

import {BeaconConnectionRequestProps} from '../screens/types';

const initialQrData = {
    network: 'Mainnet',
    address: '',
    name: 'AppName',
};

const BeaconConnectionRequest = ({
    navigation,
}: BeaconConnectionRequestProps) => {
    const [camera, setCamera] = useState(false);
    const [qrData, setQrData] = useState(initialQrData);

    const onBarCodeRead = ({data}: {data: string}) => {
        setQrData(JSON.parse(data));
        setCamera(false);
    };

    const onCancel = () => {
        navigation.navigate('Account');
        setCamera(false);
        setQrData(initialQrData);
    };

    const onConnect = async () => {
        try {
            //TODO: add peer and send to beacon

        } catch (e) {}
    };

    return (
        <>
            {camera && (
                <RNCamera
                    captureAudio={false}
                    onBarCodeRead={onBarCodeRead}
                    style={s.camera}>
                    <SafeContainer>
                        <Text>Start Camera</Text>
                    </SafeContainer>
                </RNCamera>
            )}
            {!camera && (
                <View style={s.container}>
                    <SafeContainer>
                        <Text style={s.title}>Connection Request</Text>
                        <Text
                            style={[
                                s.network,
                                s.p1,
                            ]}>{`Network: ${qrData.network}`}</Text>
                        <Text style={[s.address, s.p1]}>{qrData.address}</Text>
                        <Text
                            style={[
                                s.message,
                                s.p2,
                            ]}>{`${qrData.name} would like to connect to your account`}</Text>
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
    },
    address: {
        marginTop: 4,
        textAlign: 'center',
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
});

export default BeaconConnectionRequest;
