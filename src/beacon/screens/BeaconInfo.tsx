import * as React from 'react';
import {useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    NativeModules,
    Linking,
    TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';

import SafeContainer from '../../components/SafeContainer';
import CustomHeader from '../../components/CustomHeader';

import {BeaconConnectionRequestProps} from '../../screens/types';
import {State} from '../../reducers/types';

import ImgBeaconIntegration from '../../../assets/beacon-integration.svg';

const BeaconInfo = ({navigation}: BeaconConnectionRequestProps) => {
    const isFocused = navigation.isFocused();
    const permissions = useSelector(
        (state: State) => state.app.beaconPermissions,
    );
    const metadata = useSelector((state: State) => state.app.beaconMetadata);

    const onPressLearnMore = async () => {
        await Linking.openURL('https://www.walletbeacon.io/');
    };

    const onPressScanQrCode = () =>
        navigation.navigate('BeaconConnectionRequest');

    const onPressBack = () => navigation.navigate('Account');

    useEffect(() => {}, [permissions, metadata]);

    useEffect(() => {
        if (!isFocused) {
            return;
        }
        NativeModules.BeaconBridge.getPermissions();
        NativeModules.BeaconBridge.getAppMetadata();
    }, [isFocused]);

    return (
        <View style={s.container}>
            <SafeContainer>
                <CustomHeader onBack={onPressBack}/>
                <Text style={s.title}>dApps connected using Beacon</Text>
                {!permissions.length && (
                    <View style={s.center}>
                        <Text style={s.h1}>
                            You haven’t connected to any dApps yet.
                        </Text>
                        <View style={s.description}>
                            <Text style={s.p}>
                                Beacon allows you interact with web-based dApps
                                using your Tezos account. Once you start making
                                connections with dApps that support Beacon, they
                                will show up here!{' '}
                                <Text style={s.link} onPress={onPressLearnMore}>
                                    Learn more
                                </Text>
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={s.scan}
                            onPress={onPressScanQrCode}>
                            <Text>Scan QR Code</Text>
                        </TouchableOpacity>
                        <ImgBeaconIntegration style={s.img} />
                    </View>
                )}
                {!!permissions.length && (
                    <View>
                        <Text></Text>
                        <Text></Text>
                    </View>
                )}
            </SafeContainer>
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    center: {
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 100,
    },
    h1: {
        marginTop: 80,
        fontSize: 16,
    },
    description: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    p: {
        fontSize: 16,
        lineHeight: 24,
    },
    link: {
        fontWeight: 'bold',
    },
    img: {
        marginTop: 40,
    },
    scan: {
        marginTop: 40,
        backgroundColor: '#fcd104',
        padding: 20,
        borderRadius: 20,
    },
});

export default BeaconInfo;
