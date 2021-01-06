/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Modal} from 'react-native';
import {Container, Button, Text, View, Header} from 'native-base';
import {KeyStoreUtils} from '../softsigner';
import SeedInput from '../components/SeedInput';
import CustomHeader from '../components/CustomHeader';
import RecoveryOption from '../components/RecoveryOptions';
import { getAccountInfo } from '../reducers/app/thunks';
import * as Keychain from 'react-native-keychain';
import {setKeysAction} from '../reducers/app/actions';
import {useDispatch} from 'react-redux';
import bip39 from 'react-native-bip39';

import {AccountProps} from './types';
import {colors} from '../theme';

const RestoreAccount = ({navigation}: AccountProps) => {
    const [step, setStep] = useState(1);
    const [seeds, setSeeds] = useState("");
    const [password, setPassword] = useState('');
    const [derivationPath, setDerivationPath] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [infoText, setInfoText] = useState(false);
    const [isAccountNotFound, setAccountNotFound] = useState(false);
    const [identityData, setIdentity]: any = useState({});
    const dispatch = useDispatch();

    const handleSeeds = (seeds: string) => {
        seeds = seeds.trim().toLowerCase();
        setSeeds(seeds);
        if( bip39.validateMnemonic(seeds) ) {
            setStep(2);
        } else {
            setErrorText("Invalid mnemonic");
            setModalVisible(true);
        }
    }

    const handleRecovery = async (options: any) => {
        setPassword(options.password);
        setDerivationPath(options.derivationPath);
        let identity: any = {};
        try {
            identity = await KeyStoreUtils.restoreIdentityFromMnemonic(seeds, password, '', derivationPath)
        } catch(error) {
            setErrorText(error.message);
            setModalVisible(true);
            return false;
        }

        setIdentity(identity);
        setInfoText(identity.publicKeyHash);
        setInfoModalVisible(true);        
    }

    const recoverAccount = async () => {
       
        if( identityData.publicKeyHash ) {
            const account = await getAccountInfo(identityData.publicKeyHash).catch(
                () => false
            );
            const termsDate = new Date().toLocaleString();
            setInfoModalVisible(false); 
            if (!account) {
                const title = 'Account does not exists. We will create a new Account for you.';
                setErrorText(title);
                setModalVisible(true);
                setAccountNotFound(true);
            } else {
                await Keychain.resetGenericPassword();
                await Keychain.setGenericPassword(
                    'newwallet',
                    JSON.stringify({...identityData, termsDate}),
                );
                dispatch(setKeysAction(identityData));   
                navigation.replace('AccountSetup');
            }
        } else {
            setInfoModalVisible(false); 
            const title = 'Unable to recover Account.';
            setErrorText(title);
            setModalVisible(true);
            setAccountNotFound(true);
        }
    }

    const closeModal = async() => {
        setModalVisible(false)
        setErrorText("");
        if (isAccountNotFound) {
            const termsDate = new Date().toLocaleString();
            const keys = await KeyStoreUtils.generateIdentity();
            await Keychain.resetGenericPassword();
            await Keychain.setGenericPassword(
                'newwallet',
                JSON.stringify({...keys, termsDate}),
            );
            dispatch(setKeysAction(keys));
            setTimeout(() => {
                navigation.replace('AccountSetup');
            }, 100);
        }
    }

    return (
        <React.Fragment>
            <Container style={styles.yellowContainer}>
                <CustomHeader
                    title="Recovery Phrase"
                    onBack={() => navigation.replace('Welcome')}
                />
                {
                    step === 1 &&
                    <SeedInput onChange={handleSeeds}/>
                }

                {
                    step === 2 &&
                    <RecoveryOption onChange={handleRecovery}/>
                }
                
            </Container>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Error</Text>
                        <Text style={styles.typo2}>{errorText}</Text>
                        <Button style={styles.modalBtn} onPress={closeModal}>
                            <Text>Close</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={infoModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Found Account</Text>
                        <Text style={styles.typo2}>{infoText}</Text>
                        <Button style={styles.modalBtn} onPress={recoverAccount}>
                            <Text>Proceed</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    
    yellowContainer: {
        backgroundColor: colors.bg,
    },
    typo2: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 18,
        color:'#343434',
        marginBottom:10,
        textAlign:'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 26,
        padding: 28,
        alignItems: "center",
        width: '80%',
        elevation: 5,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    modalText: {
        marginBottom: 16,
        textAlign: "center",
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '500',
        color: '#E3787D',
    },
    modalBtn: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#4b4b4b',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 0
    }
});
export default RestoreAccount;