import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';
import {Transaction} from 'conseiljs';

import TransactionsIllustration from '../../assets/transactions-illustration.svg';
import {State} from '../reducers/types';
import CustomIcon from './CustomIcon';
import {truncateHash} from '../utils/general';
import {formatAmount} from '../utils/currency';

const Transactions = () => {
    const transactions = useSelector((state: State) => state.app.transactions);
    const publicHashKey = useSelector(
        (state: State) => state.app.publicKeyHash,
    );
    return (
        <>
            {transactions.length === 0 && (
                <View style={styles.container}>
                    <TransactionsIllustration />
                    <View style={styles.text}>
                        <Text style={styles.typo1}>
                            You don’t have any transactions.{' '}
                        </Text>
                        <Text style={[styles.typo1, styles.typo2]}>
                            Fund your account{' '}
                        </Text>
                        <Text style={styles.typo1}>to get started.</Text>
                    </View>
                </View>
            )}
            {transactions.length > 0 &&
                transactions.map((t: Transaction) => (
                    <View style={styles.listItem}>
                        <View style={styles.left}>
                            <CustomIcon
                                name={
                                    t.destination !== publicHashKey
                                        ? 'Back-Arrow'
                                        : 'Forward-Arrow'
                                }
                                size={14}
                                color="#f5942a"
                            />
                        </View>
                        <View style={styles.body}>
                            <Text style={styles.typo3}>
                                {t.destination !== publicHashKey
                                    ? 'Send'
                                    : 'Receive'}
                            </Text>
                            <View style={styles.subtitle}>
                                <Text style={styles.typo4}>
                                    {t.destination !== publicHashKey
                                        ? 'to'
                                        : 'from'}{' '}
                                </Text>
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
                                    t.destination !== publicHashKey ? '-' : '+'
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
                            <Text style={styles.typo6}>{t.utc_time}</Text>
                        </View>
                    </View>
                ))}
        </>
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
