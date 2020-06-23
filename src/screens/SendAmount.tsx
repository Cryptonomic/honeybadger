import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container, Text, Input, View} from 'native-base';

import CustomHeader from '../components/CustomHeader';
import CustomIcon from '../components/CustomIcon';
import {truncateHash} from '../utils/general';
import {colors} from '../theme';

const SendSecondStep = ({navigation}) => {
    const address = useSelector((state) => state.app.sendAddress);
    const [amount, setAmount] = useState('1,403,000.908');
    const [currency, setCurrency] = useState('50');
    const [fee, setFee] = useState(0.02);
    const title = `Send to ${truncateHash(address)}`;

    const onChange = (value) => {
        setAmount(value);
    };
    return (
        <Container style={styles.container}>
            <CustomHeader
                title={title}
                goBack={() => navigation.goBack()}
                onClose={() => navigation.navigate('Account')}
            />
            <Text style={styles.title}>Enter Amount</Text>
            <View style={styles.amount}>
                <Input
                    autoFocus
                    style={styles.input}
                    value={amount}
                    onChangeText={onChange}
                    keyboardType="numeric"
                />
                <Text style={styles.typo1}>{amount}</Text>
                <CustomIcon name="XTZ" size={30} color="#1a1919" />
            </View>
            <View style={styles.currency}>
                <Text style={styles.typo2}>$</Text>
                <Text style={styles.typo2}>{currency}</Text>
            </View>
            <View style={styles.details}>
                <View style={styles.row}>
                    <Text style={[styles.useMax, styles.typo3]}>Use Max</Text>
                    <View style={[styles.row, styles.available]}>
                        <Text style={[styles.availableText, styles.typo4]}>
                            Available
                        </Text>
                        <Text style={styles.typo4}>{amount}</Text>
                        <CustomIcon name="XTZ" size={16} color="#343434" />
                    </View>
                </View>
                <Text
                    style={[
                        styles.fee,
                        styles.typo5,
                    ]}>{`Transactions fee $${fee}`}</Text>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
    },
    title: {
        marginTop: 64,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'center',
    },
    amount: {
        marginTop: 23.5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    input: {
        display: 'none',
    },
    currency: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    details: {
        marginTop: 93.5,
        backgroundColor: '#ffffff',
        flexGrow: 1,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        padding: 26,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    useMax: {
        width: '30%',
    },
    available: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    availableText: {
        marginRight: 5,
    },
    fee: {
        marginTop: 4,
        textAlign: 'right',
    },
    typo1: {
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        fontSize: 36,
    },
    typo2: {
        fontFamily: 'Roboto-Medium',
        fontSize: 27,
        fontWeight: '500',
        color: '#1a1919',
    },
    typo3: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.67,
        color: '#2900db',
    },
    typo4: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: 'normal',
        color: '#343434',
    },
    typo5: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: 'normal',
        color: '#7d7c7c',
    },
});

export default SendSecondStep;