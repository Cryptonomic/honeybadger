import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Container, Text, Button, View} from 'native-base';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';

import {setKeysAction} from '../reducers/app/actions';
import TouchID from "react-native-touch-id";

import SafeContainer from '../components/SafeContainer';
import PinCode from '../components/PinCode';

import Logo from '../../assets/galleon-logo.svg';
import Cryptonomic from '../../assets/cryptonomic-icon.svg';
import Wave from '../../assets/splash-wave-shadow.svg';

import {WelcomeProps} from './types';

const Welcome = ({navigation}: WelcomeProps) => {
    const dispatch = useDispatch();
    const [isAccountSetup, setIsAccountSetup] = useState(false);
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [isPin, setIsPin] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                const keys = await Keychain.getGenericPassword();
                if (keys) {
                    let data: any= await Keychain.getInternetCredentials('securitySetup');
                    data = JSON.parse(data.password);
                    dispatch(setKeysAction(JSON.parse(keys.password)));
                    if(data.hasOwnProperty('securitySetup') && data.securitySetup) {
                        setIsAccountSetup(true);
                    } else {
                        navigation.replace('Account');
                    }

                    TouchID.isSupported().then((isSupported) => {
                        if(isSupported) {
                            setIsBiometricSupported(true);
                        } else {
                            setIsBiometricSupported(false);
                        }
                    }).catch((error) => {
                        setIsBiometricSupported(false);
                    })
                }
            } catch (error) {
                console.log("Keychain couldn't be accessed!", error);
            }
        }
        load();
    }, [dispatch, navigation]);

    const getStarted = () => navigation.replace('Terms');

    const showAppLock = () => {
        TouchID.isSupported()
            .then((biometryType: any) => {
                const optionalConfigObject = {
                    title: 'Authentication Required', // Android
                    imageColor: '#e00606', // Android
                    imageErrorColor: '#ff0000', // Android
                    sensorDescription: 'Touch sensor', // Android
                    sensorErrorDescription: 'Failed', // Android
                    cancelText: 'Cancel', // Android
                    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
                    unifiedErrors: false, // use unified error messages (default false)
                    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
                };
                return TouchID.authenticate("", optionalConfigObject)
                .then((success: any) => {
                    // Alert.alert('Authenticated Successfully NEW');
                    navigation.replace('Account');
                })
                .catch((error: any) => {
                    //  Do noting as user has cancelled the biometric auth
                    console.log("Touch is not available");
                });
            })
            .catch(error => {
                // Do noting as user has cancelled the biometric auth
                console.log("Touch is not available");
            });
    }

    const showPin = () => {
        setIsPin(true);
    }

    const handlePin = async(pinEntered: string) => {
        let data: any= await Keychain.getInternetCredentials('securitySetup');
        data = JSON.parse(data.password);
        if(data.pin === pinEntered) {
            //setIsPin(false);
            navigation.replace('Account');
        } else {
            setIsPin(false);
            Alert.alert("Incorrect PIN.")
        }
    }

    return (
        !isPin ? 
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
                        {
                            isAccountSetup ? 
                            <React.Fragment>
                                <Button style={styles.btn} onPress={showPin}>
                                    <Text style={styles.typo3}>Enter Pin</Text>
                                </Button>
                                {
                                    isBiometricSupported && 
                                    <Button style={styles.btn} onPress={showAppLock}>
                                        <Text style={styles.typo3}>Enter TouchID</Text>
                                    </Button>
                                }
                            </React.Fragment>
                            :
                            <Button style={styles.btn} onPress={getStarted}>
                                <Text style={styles.typo3}>Get Started</Text>
                            </Button>
                        }
                    </View>
                </View>
                
                
            </SafeContainer>
        </Container>
        :
        <Container>
            <PinCode key="pin" text='Please Choose a 6 Digit Pin' handlePin={handlePin} isResetNeeded={false} isSkipAllowed={false} />
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
        marginTop: 10
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
