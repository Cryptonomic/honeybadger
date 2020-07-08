/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Text, Button, View, Header} from 'native-base';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import Pdf from 'react-native-pdf';

import {setKeysAction} from '../reducers/app/actions';

import {WelcomeProps} from './types';

const source = { uri: 'https://github.com/Cryptonomic/Deployments/raw/master/Terms_of_Service.pdf', cache: true };

const Terms = ({navigation}: WelcomeProps) => {
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
    }, []);

    const getStarted = () => navigation.replace('Loading');

    return (
        <Container>
            <Header style={styles.header} />
            <View style={styles.bottom}>
                <View style={styles.item}>
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages, filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    style={styles.pdf}/>
                </View>
                <View style={styles.item}>
                    <Button style={styles.btn} onPress={getStarted}>
                        <Text style={styles.typo3}>Cancel</Text>
                    </Button>
                    <Button style={styles.btn} onPress={getStarted}>
                        <Text style={styles.typo3}>Continue</Text>
                    </Button>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fcd104',
    },
    top: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        justifyContent: 'center',
        flex: 1,
    },
    logo: {
        marginBottom: 100,
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
    },
    pdf: {
        flex:1,
        width: '100%',
        height: '70%',
    }
});

export default Terms;
