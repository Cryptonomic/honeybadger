/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {AccountSettingsProps} from './types';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import { CheckBox } from "react-native";
import * as Keychain from 'react-native-keychain';

const AccountSetup = ({navigation}: AccountSettingsProps) => {
    const handleSubmit = async () => {
        console.log("Hello");
        if(cPin !== pin) {
            Toast.show({
                text: "Pin and confirm pin are not same",
                buttonText: "Okay",
                duration: 3000
            })
        } else {
            await Keychain.setInternetCredentials(
                'PIN',
                'userName',
                pin
            );
            await Keychain.setInternetCredentials(
                'BIOMETRIC',
                'biometric',
                isBiometricAllowed ? '1' : '0'
            );
        }
    }
    const [isBiometricAllowed, setSelection] = useState(false);
    const [pin, onChangePin] = useState('');
    const [cPin, onChangeConfirmPin] = useState('');

    return (
        <Container>
            <Header />
            <Content>
                <Form>
                <Item floatingLabel>
                    <Label>Pin</Label>
                    <Input keyboardType='numeric' onChangeText={text => onChangePin(text)} value={pin} />
                </Item>
                <Item floatingLabel>
                    <Label>Confirm Pin</Label>
                    <Input keyboardType='numeric' secureTextEntry={true} onChangeText={text => onChangeConfirmPin(text)} value={cPin} />
                </Item>
                <Item last>
                    <CheckBox value={isBiometricAllowed} onValueChange={setSelection} />
                    <Text>Allow BiometricAuth</Text>
                </Item>
                <Button success onPress={handleSubmit}><Text> Submit </Text></Button>
                </Form>
            </Content>
            
        </Container>
    )
}

export default AccountSetup;