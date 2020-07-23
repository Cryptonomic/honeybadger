import React, {useState, FunctionComponent} from 'react';
import {StyleSheet, Clipboard} from 'react-native';
import {Text, View, Input, Item, Icon} from 'native-base';

import CustomButton from '../CustomButton';
import CustomHeader from '../CustomHeader';
import EnterAddressCamera from './EnterAddressCamera';

interface EnterAddressProps {
    headerTitle: string;
    addressTitle: string;
    goBack: () => void;
    validateAddress: (value: string) => void;
    onValidAddress: (value: string, valid: boolean) => void;
}

const EnterAddress: FunctionComponent<EnterAddressProps> = ({
    headerTitle,
    addressTitle,
    children,
    goBack,
    validateAddress,
    onValidAddress,
}) => {
    const [isValid, setIsValid] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [address, setAddress] = useState('');
    const [showCamera, setShowCamera] = useState(false);

    const onAddressTextChange = async (value: string) => {
        setAddress(value);

        if (value.trim().length === 0) {
            return;
        }

        try {
            await validateAddress(value);

            setIsValid(true);
            setIsError(false);
            setErrorMessage('');
            onValidAddress(value, true);
        } catch (err) {
            setIsValid(false);
            setIsError(true);
            setErrorMessage(err.message);
            onValidAddress(value, false);
        }
    };
    const onPasteAddress = async () => {
        const copiedMessage = await Clipboard.getString();
        onAddressTextChange(copiedMessage);
    };
    const onScanQrCode = () => setShowCamera(true);
    const onBarcodeRecognized = ({data}: {data: string}) => {
        if (data && data.length) {
            onAddressTextChange(data);
            setShowCamera(false);
        }
    };
    return (
        <>
            <EnterAddressCamera
                open={showCamera}
                onBarcodeRecognized={onBarcodeRecognized}
                onBack={() => setShowCamera(false)}
            />
            {!showCamera && (
                <>
                    <CustomHeader title={headerTitle} onBack={goBack} />
                    <Text style={styles.title}>{addressTitle}</Text>
                    <View style={styles.address}>
                        <Item regular style={styles.item}>
                            <Input
                                placeholder="e.g tz1…"
                                style={styles.input}
                                onChangeText={onAddressTextChange}
                                value={address}
                                autoCompleteType="off"
                                autoCorrect={false}
                                autoCapitalize="none"
                                returnKeyType="next"
                            />
                        </Item>
                    </View>
                    {children}
                    {isError && (
                        <View style={styles.error}>
                            <View style={styles.errorTitle}>
                                <Icon
                                    name="warning"
                                    type="AntDesign"
                                    style={styles.errorIcon}
                                />
                                <Text style={styles.typo3}>
                                    Invalid Tezos Address
                                </Text>
                            </View>
                            <View style={styles.errorText}>
                                <Text style={styles.typo4}>{errorMessage}</Text>
                            </View>
                        </View>
                    )}
                    {!isValid && (
                        <View style={styles.actions}>
                            <View>
                                <CustomButton
                                    icon="Paste"
                                    label="Paste Address"
                                    color="#f5942a"
                                    onPress={onPasteAddress}
                                />
                            </View>
                            <View style={styles.actionLine} />
                            <View>
                                <CustomButton
                                    icon="Scan"
                                    label="Scan QR Code"
                                    color="#f5942a"
                                    onPress={onScanQrCode}
                                />
                            </View>
                        </View>
                    )}
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        marginTop: 59,
    },
    address: {
        marginTop: 24,
        marginHorizontal: 24,
    },
    item: {
        borderRadius: 20,
        borderColor: 'transparent',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        paddingHorizontal: 16,
    },
    input: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        fontWeight: '300',
    },
    error: {
        marginTop: 30,
        width: 259,
        backgroundColor: '#f30000',
        alignSelf: 'center',
        borderRadius: 15.5,
        padding: 12,
    },
    errorTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        marginTop: 3,
        alignSelf: 'center',
    },
    errorIcon: {
        color: '#ffffff',
        fontSize: 14,
        marginRight: 8,
    },
    actions: {
        marginTop: 'auto',
        paddingVertical: 42,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
    },
    actionLine: {
        width: 1,
        backgroundColor: '#e8e8e8',
        marginHorizontal: 50,
    },
    next: {
        flexDirection: 'row',
        flexGrow: 1,
        paddingHorizontal: 35,
        alignItems: 'center',
    },
    nextCircle: {
        width: 36,
        height: 36,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#fcd104',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    nextButton: {
        marginLeft: 'auto',
        width: 128,
        height: 50,
        backgroundColor: '#4b4b4b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    typo1: {
        fontFamily: 'Roboto-Light',
        fontSize: 14,
        color: '#646464',
        marginBottom: 5,
    },
    typo2: {
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        fontWeight: '500',
        letterSpacing: 0.85,
    },
    typo3: {
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 0,
        color: '#ffffff',
    },
    typo4: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: 'normal',
        letterSpacing: 0,
        color: '#ffffff',
    },
});

export default EnterAddress;
