import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, Clipboard, ScrollView, Alert} from 'react-native';
import {View, Text, Container, Button} from 'native-base';
import {useSelector} from 'react-redux';
import bip39 from 'react-native-bip39'
import * as Keychain from 'react-native-keychain';
import {colors} from '../theme';
import CustomHeader from '../components/CustomHeader';
import PinCode from '../components/PinCode';
import EnableBiometric from '../components/EnableBiometric';

import {SeedPhraseProps} from './types';
import {State} from '../reducers/types';

const ResetPin = ({navigation}: SeedPhraseProps) => {
    const seed = useSelector((state: State) => state.app.seed);
    const [phraseIndexes, setPhraseIndexes] = useState([0])
    const [step, setStep] = useState('VARIFY');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [back, setBack] = useState(false);

    const [phraseInputs, setPhraseInputs] = useState([{key: 0, value: ''}]);
    // Shuffle array
    useEffect(() => { 
        const arr = seed.split(' ');   
        if(arr.length>1) {
            const shuffled = [...arr].sort(() => 0.5 - Math.random());
            let selected = shuffled.slice(0, 4);

            const phrases = [];
            phrases.push({ key: arr.indexOf(selected[0]), value: '' });
            phrases.push({ key: arr.indexOf(selected[1]), value: '' });
            phrases.push({ key: arr.indexOf(selected[2]), value: '' });
            phrases.push({ key: arr.indexOf(selected[3]), value: '' });
            setPhraseInputs(phrases)
        }
    }, [seed]);

    const onInputChange = (text: any, index: number, actualIndex: any) => {

        let data: any = phraseInputs.map((item, arrIndex) => {
            if(arrIndex == index) {
                return {...item, value: text }
            } else {
                return item
            }
        })  
        setPhraseInputs(data);
    }

    const validatePhrase = () => {
        const arr = seed.split(' '); 
        phraseInputs.forEach(item => {
            arr[item.key] = item.value;
        })

        if (bip39.validateMnemonic(arr.join(" "))) {
            setBack(true);
            setStep('PIN');
        } else {
            Alert.alert("validation failed");
        }
    }

    const handlePin = (pinCode: string) => {
        setPin(pinCode);
        setStep('CONFIRM_PIN');
    }

    const handleConfirmPin = async (pinCode: string) => {
        if (pin !== pinCode) {
            Alert.alert("Pin and confirm pin did not match");
        } else {
            const keychainData: any = await Keychain.getInternetCredentials('securitySetup'); // TODO: use GenericPassword
            const securityConfig = JSON.parse(keychainData.password);

            const setup = {
                securitySetup: true,
                isBiometric: securityConfig.isBiometric,
                pin: pin
            }
            await Keychain.setInternetCredentials(
                'securitySetup',
                'userName',
                JSON.stringify(setup)
            );
            setConfirmPin(pin);
            // Disable back btn
            setStep('ENABLE_BIOMETRIC');
        }
    }

    const skipBiometric = () => {
        navigation.replace('Account');
    }

    return (
        <Container style={styles.container}>
            {
                step === "VARIFY" &&
                <View style={styles.content}>
                    {
                        phraseInputs.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Text>Word {item.key + 1}</Text>
                                    <TextInput style={{borderWidth: 5, borderColor: '#333'}} value={item.value}
                                    onChangeText={text => {
                                        onInputChange(text, index, item);
                                    }}/>
                                </React.Fragment> 
                            )
                        })
                    }
                    <Button style={styles.btn} onPress={validatePhrase}>
                                    <Text>Reset Pin</Text>
                    </Button>
                </View>
            }
            {
                back &&
                <CustomHeader title="Enable App Lock" onBack={() => navigation.goBack()} />
            }
            {
                step === "PIN" &&
                <PinCode key="pin" text='Please Choose a 6 Digit Pin' handlePin={handlePin} isResetNeeded={true} isSkipAllowed={false} skipBiometric={true} />
            }
            {
                step === "CONFIRM_PIN" &&
                <PinCode key="confirm-pin" text='Please Confirm Your Pin' handlePin={handleConfirmPin} isResetNeeded={true} isSkipAllowed={false} />
            }
            {
                step === "ENABLE_BIOMETRIC" &&
                <EnableBiometric success={true} skipBiometric={skipBiometric}/>
            }
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
        paddingHorizontal: 40,
        marginTop: 50
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
});

export default ResetPin;
