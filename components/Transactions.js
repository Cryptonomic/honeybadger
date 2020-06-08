import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';

import TransactionsIllustration from '../assets/transactions-illustration.svg';

const Transactions = () => {
    return (
        <View style={styles.container}>
            <TransactionsIllustration />
            <Text style={styles.text}>
                You don’t have any transactions. Fund your account to get
                started.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        marginTop: 50,
        paddingLeft: 80,
        paddingRight: 80,
    },
});

export default Transactions;
