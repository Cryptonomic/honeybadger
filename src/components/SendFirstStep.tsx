import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Content, Input, Item, Button} from 'native-base';

import CustomButton from '../components/CustomButton';
import {colors} from '../theme';
import CustomIcon from '../components/CustomIcon';

import {truncateHash} from '../utils/general';

const SendFirstStep = () => {
    const [isValid, setIsValid] = useState(false);
    const [address, setAddress] = useState(
        'tz1Mb7z2BcLyD42hnL9LyLyPyRtK6KjE6Vq',
    );
    const onEnterAddress = (value) => {
        setAddress(value);
        if (value.length >= 36) {
            setIsValid(true);
            return;
        }

        if (value.length < 36) {
            setIsValid(false);
        }
    };
    return (
        <>
            <Text style={styles.title}>Enter Recepient Address</Text>
            <Content style={styles.address}>
                <Item regular style={styles.item}>
                    <Input
                        placeholder="e.g tz1…"
                        style={styles.input}
                        onChangeText={onEnterAddress}
                        value={address}
                    />
                </Item>
            </Content>
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
                        <Button style={styles.nextButton}>
                            <Text style={styles.typo2}>Next</Text>
                        </Button>
                    </View>
                )}
            </View>
        </>
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
});

export default SendFirstStep;
