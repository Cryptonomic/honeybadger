import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {
    Header,
    Container,
    View,
    Text,
    Left,
    Right,
    Button,
    Title,
    Body,
} from 'native-base';
import QRCode from 'react-native-qrcode-svg';

import CustomIcon from '../components/CustomIcon';
import {splitHash} from '../utils/general';

const Receive = () => {
    const address = useSelector((state) => state.app.publicKeyHash);
    const addressParts = splitHash(address);
    return (
        <Container style={styles.container}>
            <Header style={styles.header} transparent>
                <Left>
                    <Button transparent>
                        <CustomIcon name="Back-Arrow" size={16} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.headerTitle}>Receive</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <CustomIcon name="Cancel" size={16} />
                    </Button>
                </Right>
            </Header>
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
                        <Button style={styles.actionButton}>
                            <CustomIcon name="Copy" size={35} />
                        </Button>
                        <Text style={styles.actionText}>Copy</Text>
                    </View>
                    <View style={styles.line} />
                    <View>
                        <Button style={styles.actionButton}>
                            <CustomIcon name="Share-Android" size={35} />
                        </Button>
                        <Text style={styles.actionText}>Share</Text>
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
    header: {
        marginHorizontal: 10,
    },
    headerTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0.83,
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
        marginBottom: 90,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionButton: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        marginTop: 15,
        textAlign: 'center',
    },
    line: {
        width: 1,
        backgroundColor: '#e8e8e8',
        marginHorizontal: 60,
    },
});

export default Receive;
