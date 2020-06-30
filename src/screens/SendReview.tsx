import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container, Text, View, Button} from 'native-base';

import {sendTransaction} from '../reducers/app/thunks';

import CustomHeader from '../components/CustomHeader';
import CustomIcon from '../components/CustomIcon';
import {truncateHash} from '../utils/general';
import {formatAmount} from '../utils/currency';
import {colors} from '../theme';

const SendReview = ({navigation}) => {
    const dispatch = useDispatch();
    const publicKeyHash = useSelector((state) => state.app.publicKeyHash);
    const address = useSelector((state) => state.app.sendAddress);
    const [amount, setAmount] = useState(1000000);
    const [currency, setCurrency] = useState(0);
    const [fee, setFee] = useState(0.02);
    const [feeCurrency, setFeeCurrency] = useState(0.029);
    const onSend = () => {
        dispatch(sendTransaction());
    };
    return (
        <Container style={styles.container}>
            <CustomHeader
                title="Review Transaction"
                onBack={() => navigation.goBack()}
                onClose={() => navigation.navigate('Account')}
            />
            <View style={styles.paper}>
                <Text style={[styles.title, styles.typo1]}>
                    From My Account
                </Text>
                <Text style={[styles.address, styles.typo2]}>
                    {truncateHash(publicKeyHash)}
                </Text>
                <View style={styles.dividerLine} />
                <Text style={[styles.title, styles.typo1]}>Amount</Text>
                <View style={[styles.row, styles.amount]}>
                    <Text style={styles.typo3}>{formatAmount(amount)}</Text>
                    <CustomIcon name="XTZ" size={30} color="#1a1919" />
                </View>
                <View style={styles.currency}>
                    <Text style={styles.typo4}>$</Text>
                    <Text style={styles.typo4}>{currency}</Text>
                </View>
                <View style={styles.dividerLine} />
                <View style={[styles.dividerArrow1, styles.arrow]} />
                <View style={[styles.dividerArrow2, styles.arrow]} />
                <Text style={[styles.title, styles.typo1, styles.recepient]}>
                    To Recepient
                </Text>
                <Text style={[styles.address, styles.typo2]}>
                    {truncateHash(address)}
                </Text>
                <View style={[styles.fee, styles.row]}>
                    <Text
                        style={
                            styles.typo5
                        }>{`+ Transaction Fee $${fee}`}</Text>
                    <View style={[styles.row, styles.feeCurrency]}>
                        <Text>{`(${feeCurrency}`}</Text>
                        <CustomIcon name="XTZ" size={14} />
                        <Text>{')'}</Text>
                    </View>
                </View>
                <Button style={styles.button} onPress={onSend}>
                    <Text>Tap to Send</Text>
                </Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
    },
    paper: {
        backgroundColor: '#ffffff',
        flexGrow: 1,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        marginTop: 20,
        paddingHorizontal: 36,
        paddingTop: 67,
        paddingBottom: 23,
        alignItems: 'center',
    },
    title: {
        color: '#343434',
    },
    address: {
        marginTop: 13,
    },
    dividerLine: {
        marginTop: 20,
        marginBottom: 26,
        width: 2,
        height: 56,
        backgroundColor: '#fcd104',
        zIndex: 10,
    },
    dividerArrow1: {
        marginTop: -30,
        borderTopColor: '#fcd104',
    },
    dividerArrow2: {
        marginTop: -9,
        borderTopColor: '#ffffff',
    },
    arrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightWidth: 6,
        borderRightColor: 'transparent',
        borderTopWidth: 6,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amount: {
        marginTop: 15,
    },
    currency: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recepient: {
        marginTop: 23,
    },
    fee: {
        marginTop: 58,
    },
    feeCurrency: {
        marginLeft: 2,
    },
    button: {
        marginTop: 21,
        width: 277,
        height: 61,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30.5,
        backgroundColor: '#4b4b4b',
    },
    typo1: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: 'normal',
    },
    typo2: {
        fontFamily: 'Roboto-Medium',
        fontSize: 24,
        fontWeight: '500',
    },
    typo3: {
        fontFamily: 'Roboto-Medium',
        fontSize: 36,
        fontWeight: '500',
        color: '#1a1919',
    },
    typo4: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        fontWeight: '500',
        color: '#7f7c7c',
    },
    typo5: {
        fontFamily: 'Roboto-Bold',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7f7c7c',
    },
});

export default SendReview;
