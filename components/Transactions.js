import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';

import TransactionsIllustration from '../assets/transactions-illustration.svg';

const Transactions = () => {
    return (
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
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        marginTop: 50,
        paddingHorizontal: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
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
});

export default Transactions;
