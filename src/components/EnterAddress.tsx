import React, {useState, FunctionComponent} from 'react';
import {StyleSheet, Clipboard} from 'react-native';
import {Text, View, Input, Item, Button, Icon} from 'native-base';
import {RNCamera} from 'react-native-camera';

import CustomButton from '../components/CustomButton';
import CustomIcon from '../components/CustomIcon';
import CustomHeader from '../components/CustomHeader';
import {truncateHash} from '../utils/general';

interface EnterAddressProps {
    headerTitle: string;
    addressTitle: string;
    nextTitle: string;
    errorMessages: Record<'start' | 'length', string>;
    goBack: () => void;
    goNext: () => void;
    onValidAddress: (value: string) => void;
}

const EnterAddress: FunctionComponent<EnterAddressProps> = ({
    headerTitle,
    addressTitle,
    nextTitle,
    errorMessages,
    children,
    goBack,
    goNext,
    onValidAddress,
}) => {
    const [isValid, setIsValid] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [address, setAddress] = useState('');
    const [showCamera, setShowCamera] = useState(false);

    const onAddressTextChange = (value: string) => {
        setAddress(value);

        if (value.length >= 2 && !value.includes('tz', 0)) {
            setIsError(true);
            setErrorMessage(errorMessages['start']);
            return;
        }

        if (value.length === 36) {
            onValidAddress(value);
            setIsValid(true);
            setIsError(false);
            setErrorMessage('');
            return;
        }

        if (value.length < 36 || value.length > 36) {
            setIsValid(false);
            setIsError(true);
            setErrorMessage(errorMessages['length']);
        }

        // TODO: if TezosNodeReader.isImplicitAndEmpty show a warning
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
    const cameraBtnProps = {
        size: 30,
        color: '#ffffff',
    };
    return (
        <>
            {showCamera && (
                <>
                    <RNCamera
                        captureAudio={false}
                        style={styles.camera}
                        onBarCodeRead={onBarcodeRecognized}>
                        <CustomHeader
                            onBack={() => setShowCamera(false)}
                            leftIconName="Cancel"
                            backIconCustomStyles={cameraBtnProps}
                        />
                    </RNCamera>
                </>
            )}
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
                                <Text style={styles.typo4}>
                                    {errorMessage}
                                </Text>
                            </View>
                        </View>
                    )}
                    <View style={styles.actions}>
                        {!isValid && (
                            <>
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
                            </>
                        )}
                        {isValid && (
                            <View style={styles.next}>
                                <View style={styles.nextCircle}>
                                    <CustomIcon
                                        name="Checkmark"
                                        size={16}
                                        color="#ff8f00"
                                    />
                                </View>
                                <View>
                                    <Text style={styles.typo1}>
                                        {nextTitle}
                                    </Text>
                                    <Text>{truncateHash(address)}</Text>
                                </View>
                                <Button
                                    style={styles.nextButton}
                                    onPress={goNext}>
                                    <Text style={styles.typo2}>Next</Text>
                                </Button>
                            </View>
                        )}
                    </View>
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
