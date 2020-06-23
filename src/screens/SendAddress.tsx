import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container, Text, View, Input, Item, Button, Icon} from 'native-base';

import {setSendAddress} from '../reducers/app/actions';

import CustomButton from '../components/CustomButton';
import CustomIcon from '../components/CustomIcon';
import CustomHeader from '../components/CustomHeader';
import {colors} from '../theme';
import {truncateHash} from '../utils/general';

const errorsMsg = {
    start: 'Tezos Address start wtih tz or KT',
    short: 'This address is too short. Tezos Addresses are 42 characters long.',
};

const SendFirstStep = ({navigation}) => {
    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState(false);
    const [isError, setIsError] = useState(false);
    const [address, setAddress] = useState(
        'tz1Mb7z2BcLyD42hnL9LyLyPyRtK6KjE6Vq',
    );
    const onEnterAddress = (value) => {
        setAddress(value);

        if (
            value.length >= 2 &&
            !value.includes('tz', 0) &&
            !value.includes('KT', 0)
        ) {
            setIsError(true);
            return;
        }

        if (value.length >= 36) {
            dispatch(setSendAddress(value));
            setIsValid(true);
            return;
        }

        if (value.length < 36) {
            setIsValid(false);
        }
    };
    const goNext = () => {
        navigation.navigate('SendFirstTime');
    };
    return (
        <Container style={styles.container}>
            <CustomHeader
                title="Send"
                goBack={() => navigation.goBack()}
                onClose={() => navigation.navigate('Account')}
            />
            <Text style={styles.title}>Enter Recepient Address</Text>
            <View style={styles.address}>
                <Item regular style={styles.item}>
                    <Input
                        placeholder="e.g tz1…"
                        style={styles.input}
                        onChangeText={onEnterAddress}
                        value={address}
                    />
                </Item>
            </View>
            {isError && (
                <View style={styles.error}>
                    <View style={styles.errorTitle}>
                        <Icon
                            name="warning"
                            type="AntDesign"
                            style={styles.errorIcon}
                        />
                        <Text style={styles.typo3}>Invalid Tezos Address</Text>
                    </View>
                    <View style={styles.errorText}>
                        <Text style={styles.typo4}>{errorsMsg.start}</Text>
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
                            />
                        </View>
                        <View style={styles.actionLine} />
                        <View>
                            <CustomButton
                                icon="Scan"
                                label="Scan QR Code"
                                color="#f5942a"
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
                            <Text style={styles.typo1}>Recepient Address</Text>
                            <Text>{truncateHash(address)}</Text>
                        </View>
                        <Button style={styles.nextButton} onPress={goNext}>
                            <Text style={styles.typo2}>Next</Text>
                        </Button>
                    </View>
                )}
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
    },
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
        marginHorizontal: 60,
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

export default SendFirstStep;