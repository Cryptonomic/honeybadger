import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Button} from 'native-base';

import DelegationIllustration from '../assets/delegation-illustration.svg';

const Delegation = () => {
    return (
        <View style={styles.container}>
            <DelegationIllustration />
            <Text style={styles.title}>Grow your Tezos Stash</Text>
            <Text style={styles.subtitle}>Delegate XTZ to earn returns.</Text>
            <Button style={styles.btn}>
                <Text>Delegate Now</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        marginTop: 50,
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
});

export default Delegation;
