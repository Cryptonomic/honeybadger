import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Button, Text, View, Header} from 'native-base';
import CustomHeader from '../components/CustomHeader';
import EnterAddressCamera from '../components/EnterAddress/EnterAddressCamera';


import {AccountProps} from './types';

const Beacon = ({navigation}: AccountProps) => {
    const [showCamera, setShowCamera] = useState(true);
    const [step, setStep] = useState(1);

    const onBarcodeRecognized = ({data}: {data: string}) => {
        if (data && data.length) {
            // onAddressTextChange(data);
            setShowCamera(false);
        }
    };
    const scanQrCode = () => {
        setShowCamera(true);
        setStep(2);
    }

    const closeCamera = () => {
        setShowCamera(false);
        setStep(1);
    }

    return (
        <Container style={styles.container}>
            <CustomHeader title="Beacon" onBack={() => navigation.goBack()} />
            <View style={styles.text}>
                {
                    step == 1 &&
                    <Button style={styles.btn} onPress={scanQrCode}>
                        <Text style={styles.typo3}>Scan QR code</Text>
                    </Button>
                }
                {
                    step == 2 &&
                    <EnterAddressCamera
                        open={showCamera}
                        onBarcodeRecognized={onBarcodeRecognized}
                        onBack={() => closeCamera()}
                    />
                }
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcd104',
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
    typo3: {
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        fontWeight: '500',
        letterSpacing: 0.85,
    },
    text: {
        justifyContent: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',

        flex:1
    }
})

export default Beacon;