import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container, Text, View, Button} from 'native-base';
import Modal from 'react-native-modal';

import {setDelegateAddress} from '../reducers/app/actions';
import DelegateFirstIllustration from '../../assets/vault-illustration.svg';
import DelegateSecondIllustration from '../../assets/wallet-illustration.svg';
import EnterAddress from '../components/EnterAddress';
import {colors} from '../theme';

import {DelegateAddressProps} from './types';
import CustomIcon from '../components/CustomIcon';

const errorMessages = {
    start: 'Tezos Address start wtih tz',
    short: 'This address is too short. Tezos Addresses are 42 characters long.',
};

const DelegateAddress = ({navigation}: DelegateAddressProps) => {
    const [isModal, setIsModal] = useState(false);
    const [modalPage, setModalPage] = useState(0);
    const dispatch = useDispatch();
    const goNext = () => {
        navigation.navigate('DelegateReview');
    };
    const onValidAddress = (value: string) => {
        dispatch(setDelegateAddress(value));
    };
    const goNextModalPage = () => {
        if (modalPage === 1) {
            setIsModal(false);
            setModalPage(0);
        }

        setModalPage(1);
    };
    const modal = [
        {
            title: 'When you delegate, your funds stay in your control.',
            subtitle: 'A baker cannot run away with your XTZ.',
            btn: 'Next',
        },
        {
            title: 'There is no lock-up period',
            subtitle:
                'You are free to transfer funds in and out of your account.',
            btn: 'GotIt!',
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setIsModal(true);
        }, 500);
    }, []);

    return (
        <Container style={styles.container}>
            <EnterAddress
                headerTitle="Delegate"
                addressTitle="Enter Baker Address"
                nextTitle="Baker Address"
                errorMessages={errorMessages}
                goBack={() => navigation.goBack()}
                goNext={goNext}
                onValidAddress={onValidAddress}
            />
            <Modal
                isVisible={isModal}
                style={styles.modal}
                animationOutTiming={500}
                animationInTiming={500}>
                <View style={styles.modalContent}>
                    <View style={styles.illustration}>
                        {modalPage === 0 && <DelegateFirstIllustration />}
                        {modalPage === 1 && <DelegateSecondIllustration />}
                    </View>
                    <Text style={[styles.title, styles.typo1]}>
                        {modal[modalPage].title}
                    </Text>
                    <Text style={[styles.subtitle, styles.typo2]}>
                        {modal[modalPage].subtitle}
                    </Text>
                    <View style={styles.actions}>
                        <View style={styles.dots}>
                            <View
                                style={
                                    modalPage === 0
                                        ? [styles.dot, styles.activeDot]
                                        : styles.dot
                                }
                            />
                            <View
                                style={
                                    modalPage === 1
                                        ? [styles.dot, styles.activeDot]
                                        : styles.dot
                                }
                            />
                        </View>
                        <View>
                            <Button
                                transparent
                                style={
                                    modalPage === 1
                                        ? [styles.btn, styles.btnEnd]
                                        : styles.btn
                                }
                                onPress={goNextModalPage}>
                                <Text
                                    style={[
                                        styles.btnNext,
                                        styles.typo3,
                                        modalPage === 1
                                            ? styles.btnEndText
                                            : null,
                                    ]}>
                                    {modal[modalPage].btn}
                                </Text>
                                {modalPage === 0 && (
                                    <CustomIcon name="Caret-Left" size={10} />
                                )}
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
    },
    modal: {
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        height: '65%',
        marginTop: 'auto',
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        alignItems: 'center',
    },
    illustration: {
        marginTop: 50,
    },
    title: {
        width: 330,
        textAlign: 'center',
        marginTop: 25,
    },
    subtitle: {
        width: 314,
        color: '#1a1919',
    },
    actions: {
        width: '100%',
        marginTop: 'auto',
        marginBottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 50,
        alignItems: 'center',
    },
    dots: {
        flexDirection: 'row',
    },
    dot: {
        width: 13,
        height: 13,
        borderRadius: 6.5,
        backgroundColor: '#c1c1c1',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#ff8f00',
    },
    btn: {
        width: 156,
        height: 50,
        borderWidth: 1,
        borderColor: '#979797',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnNext: {
        color: '#0f0c02',
    },
    btnEnd: {
        backgroundColor: '#4b4b4b',
        borderWidth: 0,
    },
    btnEndText: {
        color: '#ffffff',
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        fontWeight: '500',
        letterSpacing: 0.85,
    },
    typo1: {
        fontFamily: 'Roboto-Medium',
        fontSize: 24,
        fontWeight: '500',
        letterSpacing: 1,
        lineHeight: 34,
    },
    typo2: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        fontWeight: '300',
        lineHeight: 30,
    },
    typo3: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
});

export default DelegateAddress;
