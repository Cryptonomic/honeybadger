import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Text, Button, View} from 'native-base';

import Logo from '../assets/galleon-logo.svg';

const Welcome = ({navigation}) => {
    const getStarted = () => navigation.replace('Loading');
    return (
        <Container>
            <View style={styles.top}>
                <Logo />
            </View>
            <View style={styles.item}>
                <Text>Product of Cryptonomic</Text>
            </View>
            <View style={styles.item}>
                <Button style={styles.btn} onPress={getStarted}>
                    <Text>Get Started</Text>
                </Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    top: {
        height: '70%',
        backgroundColor: '#fcd104',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        marginTop: 25,
        alignItems: 'center',
    },
    btn: {
        width: 256,
        height: 50,
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#4b4b4b',
    },
});

export default Welcome;
