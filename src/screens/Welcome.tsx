import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Text, Button, View} from 'native-base';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';

import {setKeysAction} from '../reducers/app/actions';

import SafeContainer from '../components/SafeContainer';

import Logo from '../../assets/galleon-logo.svg';
import Cryptonomic from '../../assets/cryptonomic-icon.svg';
import Wave from '../../assets/splash-wave-shadow.svg';

import {WelcomeProps} from './types';

const Welcome = ({navigation}: WelcomeProps) => {
    const dispatch = useDispatch();
    useEffect(() => {
        async function load() {
            try {
                const keys = await Keychain.getGenericPassword();
                if (keys) {
                    dispatch(setKeysAction(JSON.parse(keys.password)));
                    navigation.replace('Account');
                }
            } catch (error) {
                console.log("Keychain couldn't be accessed!", error);
            }
        }
        load();
    }, [dispatch, navigation]);

    const getStarted = () => navigation.replace('Terms');

    return (
        <Container>
            <View style={styles.waveBg} />
            <SafeContainer>
                <View style={styles.wave}>
                    <Wave />
                </View>
                <View style={styles.logo}>
                    <Logo />
                </View>
                <View style={styles.bottom}>
                    <View style={styles.item}>
                        <View style={styles.text}>
                            <Text style={styles.typo1}>A product of</Text>
                            <Cryptonomic style={styles.logoCrytponomic} />
                            <Text style={styles.typo2}>Cryptonomic</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Button style={styles.btn} onPress={getStarted}>
                            <Text style={styles.typo3}>Get Started</Text>
                        </Button>
                    </View>
                </View>
            </SafeContainer>
        </Container>
    );
};

const styles = StyleSheet.create({
    waveBg: {
        backgroundColor: '#fcd104',
        width: '100%',
        height: '30%',
        position: 'absolute',
    },
    wave: {
        position: 'absolute',
        width: '100%',
        height: '70%',
    },
    logo: {
        height: '55%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        justifyContent: 'center',
        flex: 1,
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
        alignSelf: 'center',
    },
    text: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoCrytponomic: {
        marginHorizontal: 5,
    },
    typo1: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        fontWeight: '300',
        letterSpacing: 0.13,
        color: 'rgb(80, 80, 80)',
    },
    typo2: {
        fontFamily: 'Roboto-Light',
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.13,
        color: 'rgb(80, 80, 80)',
    },
    typo3: {
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        fontWeight: '500',
        letterSpacing: 0.85,
        textTransform: 'capitalize',
    },
});

export default Welcome;
