/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Container, Button, Text, View, Header} from 'native-base';
import * as Keychain from 'react-native-keychain';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import SeedInput from '../components/SeedInput';
import CustomHeader from '../components/CustomHeader';
import RecoveryOption from '../components/RecoveryOptions';

import {AccountProps} from './types';
import {colors} from '../theme';

const RestoreAccount = ({navigation}: AccountProps) => {
    const [step, setStep] = useState(1);

    const handleSeeds = (seeds: String) => {
        setStep(2);
    }

    const handleRecovery = (options: any) => {
        // handle
    }

    return (
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
    )
}

const styles = StyleSheet.create({
    
    yellowContainer: {
        backgroundColor: colors.bg,
    },
});
export default RestoreAccount;