import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Button} from 'native-base';

import DelegationIllustration from '../../assets/delegation-illustration.svg';

const Delegation = () => {
    return (
        <View style={styles.container}>
            <DelegationIllustration />
            <Text style={[styles.title, styles.typo1]}>
                Grow your Tezos Stash
            </Text>
            <Text style={[styles.subtitle, styles.typo2]}>
                Delegate XTZ to earn returns.
            </Text>
            <Button style={styles.btn}>
                <Text style={styles.typo3}>Delegate Now</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 25,
    },
    title: {
        marginTop: 25,
    },
    subtitle: {
        marginTop: 10,
    },
    btn: {
        marginTop: 22,
        width: 256,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4b4b4b',
        justifyContent: 'center',
    },
    typo1: {
        fontFamily: 'Roboto-Medium',
        fontSize: 24,
        fontWeight: '500',
        color: 'rgb(75, 75, 75)',
    },
    typo2: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        fontWeight: '300',
        lineHeight: 21,
    },
    typo3: {
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        fontWeight: '500',
        letterSpacing: 0.85,
    },
});

export default Delegation;
