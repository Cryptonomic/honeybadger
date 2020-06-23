import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Button, Container, Header} from 'native-base';

import FirstTimeAddress from '../../assets/first-time-address-illustration.svg';
import {colors} from '../theme';

const SendFirstTime = ({navigation}) => {
    const onPress = () => {
        navigation.navigate('SendAmount');
    };
    return (
        <Container style={styles.container}>
            <Header transparent />
            <View style={styles.content}>
                <FirstTimeAddress style={styles.picture} />
                <Text style={styles.title}>
                    It’s a first time you are sending to this address.
                </Text>
                <Text style={styles.body}>
                    We recommend sending a small amount first (a tracer
                    transaction) to ensure that this is the right address.
                </Text>
                <Text style={styles.info}>
                    In cryptocurrencies there is no way to recover funds once
                    they are sent.
                </Text>
                <Button style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Got It!</Text>
                </Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
    },
    content: {
        backgroundColor: '#ffffff',
        flexGrow: 1,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        alignItems: 'center',
    },
    picture: {
        marginTop: 81,
    },
    title: {
        marginTop: 45,
        width: 330,
        fontFamily: 'Roboto-Medium',
        fontSize: 24,
        fontWeight: '500',
        letterSpacing: 1,
        textAlign: 'center',
    },
    body: {
        marginTop: 24,
        width: 330,
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        fontWeight: '300',
        textAlign: 'center',
    },
    info: {
        marginTop: 24,
        width: 330,
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#ff0000',
    },
    button: {
        marginTop: 48,
        width: 157,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#4b4b4b',
    },
    buttonText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        fontWeight: '500',
        letterSpacing: 0.85,
    },
});

export default SendFirstTime;
