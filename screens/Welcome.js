import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Container, Text, Button, Header, View, Grid} from 'native-base';

import Logo from '../assets/galleon_logo.svg';

const Welcome = ({navigation}) => {
    const getStarted = () => navigation.replace('Loading');
    return (
        <Container style={styles.container}>
            <View style={styles.top}>
                <Logo />
            </View>
            <Text>Logo</Text>
            <Text>Product of Cryptonomic</Text>
            <Button onPress={getStarted}>
                <Text>Get Started</Text>
            </Button>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    },
    top: {
        height: '70%',
        backgroundColor: '#fcd104',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100
    }
});

export default Welcome;
