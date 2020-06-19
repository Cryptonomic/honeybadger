import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Container, View, Text} from 'native-base';
import QRCode from 'react-native-qrcode-svg';

import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import {splitHash} from '../utils/general';

const Receive = ({navigation}) => {
    const address = useSelector((state) => state.app.publicKeyHash);
    const addressParts = splitHash(address);
    return (
        <Container style={styles.container}>
            <CustomHeader title="Receive" goBack={() => navigation.goBack()} />
            <View style={styles.main}>
                <Text style={styles.title}>
                    Share your account address to receive XTZ or Tezos tokens
                </Text>
                <View style={styles.qr}>
                    <QRCode value={address} size={199} />
                </View>
                <View style={styles.address}>
                    {addressParts.map((item, i) => (
                        <Text
                            style={
                                !(i === 0 || i === addressParts.length - 1)
                                    ? [
                                          styles.addressItem,
                                          styles.addressItemMiddle,
                                      ]
                                    : styles.addressItem
                            }>
                            {item}
                        </Text>
                    ))}
                </View>
                <View style={styles.actions}>
                    <View>
                        <CustomButton icon="Copy" label="Copy" />
                    </View>
                    <View style={styles.line} />
                    <View>
                        <CustomButton icon="Share-Android" label="Share" />
                    </View>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcd104',
    },
    main: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        flexGrow: 1,
    },
    title: {
        marginTop: 61,
        width: 292,
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        fontWeight: '500',
    },
    qr: {
        marginTop: 40,
        minWidth: 249,
        minHeight: 249,
        marginHorizontal: 80,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'rgb(232, 232, 232)',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    address: {
        marginTop: 55,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    addressItem: {
        paddingHorizontal: 2,
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        fontWeight: '500',
    },
    addressItemMiddle: {
        color: '#979797',
    },
    actions: {
        marginTop: 'auto',
        marginBottom: 42,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    line: {
        width: 1,
        backgroundColor: '#e8e8e8',
        marginHorizontal: 60,
    },
});

export default Receive;
