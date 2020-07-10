import React from 'react';
import {useSelector} from 'react-redux';
import {Linking, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'; // TODO: update to rn 0.63+ and use Pressable
import {View, Text} from 'native-base';
import moment from 'moment';

import TransactionsIllustration from '../../assets/transactions-illustration.svg';
import {State ,Operation} from '../reducers/types';
import CustomIcon from './CustomIcon';
import {truncateHash} from '../utils/general';
import {formatAmount} from '../utils/currency';
import config from '../config';

const Transactions = () => {
    const transactions = useSelector((state: State) => state.app.transactions);
    const publicHashKey = useSelector((state: State) => state.app.publicKeyHash);

    const onTransactionPress = (opGroupHash: string) => {
        Linking.openURL(`${config[0].explorerUrl}/${opGroupHash}`);
    };

    return (
        <ScrollView>
            {transactions.length === 0 && (
                <View style={styles.container}>
                    <TransactionsIllustration />
                    <View style={styles.text}>
                        <Text style={styles.typo1}>
                            You don’t have any transactions yet.{' '}
                        </Text>
                        <Text style={[styles.typo1]}>
                            Fund your account{' '}
                        </Text>
                        <Text style={styles.typo1}>to get started.</Text>
                    </View>
                </View>
            )}
            {transactions.length > 0 &&
                transactions
                    .filter((t: Operation) => t.amount)
                    .map((t: Operation) => (
                        <TouchableOpacity onPress={() => onTransactionPress(t.opGroupHash)}>
                            <View style={styles.listItem}>
                                <View style={styles.left}>
                                    <CustomIcon
                                        name={t.destination !== publicHashKey ? 'Back-Arrow' : 'Forward-Arrow'}
                                        size={14}
                                        color="#f5942a"
                                    />
                                </View>
                                <View style={styles.body}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.typo3}>
                                            {t.destination !== publicHashKey ? 'Sent' : 'Received'}
                                        </Text>
                                        <Text style={styles.typo4}>
                                            {' '}{t.destination !== publicHashKey ? 'to' : 'from'}
                                        </Text>
                                    </View>
                                    <View style={styles.subtitle}>
                                        <Text style={styles.typo3}>
                                            {truncateHash(
                                                t.destination !== publicHashKey
                                                    ? t.destination
                                                    : t.source,
                                            )}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.right}>
                                    <View style={styles.amount}>
                                        <Text
                                            style={[
                                                styles.typo5,
                                                t.destination !== publicHashKey
                                                    ? styles.colorSend
                                                    : styles.colorReceive,
                                            ]}>{`${
                                            t.destination !== publicHashKey
                                                ? '-'
                                                : '+'
                                        }${formatAmount(Number(t.amount))}`}</Text>
                                        <CustomIcon
                                            name="XTZ"
                                            size={14}
                                            color={
                                                t.destination !== publicHashKey
                                                    ? '#e3787d'
                                                    : '#259c90'
                                            }
                                        />
                                    </View>
                                    <Text style={styles.typo6}>
                                        {moment.utc(new Date(t.timestamp)).local().format("MMM D, HH:mm")}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 25,
    },
    text: {
        marginTop: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    listItem: {
        width: '100%',
        marginTop: 25,
        flexDirection: 'row',
        borderStyle: 'solid',
        alignItems: 'center',
    },
    left: {
        flex: 0,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f9c000',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 16,
    },
    body: {
        flex: 1,
        marginHorizontal: 7,
        justifyContent: 'center',
    },
    right: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    amount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitle: {
        flexDirection: 'row',
    },
    colorSend: {
        color: '#e3787d',
    },
    colorReceive: {
        color: '#259c90',
    },
    typo1: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        fontWeight: '300',
        lineHeight: 24,
    },
    typo2: {
        fontWeight: '600',
        color: 'rgb(43, 29, 215)',
    },
    typo3: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        fontWeight: '500',
        color: 'rgb(74, 74, 74)',
    },
    typo4: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        fontWeight: '300',
        color: 'rgb(74, 74, 74)',
    },
    typo5: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        fontWeight: 'bold',
    },
    typo6: {
        fontFamily: 'Roboto-Medium',
        fontSize: 12,
        fontWeight: '500',
        color: 'rgb(144, 144, 144)',
    },
});

export default Transactions;
