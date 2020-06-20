import React from 'react';
import {Container, Text, Button, View} from 'native-base';

import styles from './styles';

import Logo from '../../assets/galleon-logo.svg';

const Welcome = ({navigation} : any) => {
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

export default Welcome;
