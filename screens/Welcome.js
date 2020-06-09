import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Text, Button, View} from 'native-base';

import Logo from '../assets/galleon-logo.svg';
import Cryptonomic from '../assets/cryptonomic-icon.svg';
import Wave from '../assets/splash-wave.svg';
import WaveShadow from '../assets/splash-wave-shadow.svg';

const Welcome = ({navigation}) => {
    const getStarted = () => navigation.replace('Loading');
    return (
        <Container>
            <Wave style={styles.wave} />
            <WaveShadow style={styles.waveShadow} />
            <View style={styles.waveBg} />
            <View style={styles.top}>
                <Logo style={styles.logo} />
            </View>
            <View style={styles.item}>
                <View style={styles.text}>
                    <Text>Product of</Text>
                    <Cryptonomic style={styles.logoCrytponomic} />
                    <Text>Cryptonomic</Text>
                </View>
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
    text: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoCrytponomic: {
        marginHorizontal: 5,
    },
    logo: {
        marginBottom: 100,
    },
    wave: {
        position: 'absolute',
        width: '100%',
        height: '70%',
    },
    waveShadow: {
        position: 'absolute',
        width: '100%',
        height: '65%',
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    waveBg: {
        position: 'absolute',
        backgroundColor: '#fcd104',
        width: '100%',
        height: '30%',
    },
});

export default Welcome;
