import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container, Text, View, Button} from 'native-base';
import Modal from 'react-native-modal';

import {setDelegateAddress} from '../reducers/app/actions';
import {cancelDelegation} from '../reducers/app/thunks';
import DelegateFirstIllustration from '../../assets/vault-illustration.svg';
import DelegateSecondIllustration from '../../assets/wallet-illustration.svg';
import EnterAddress from '../components/EnterAddress';
import {colors} from '../theme';

import {DelegateAddressProps} from './types';
import {State} from '../reducers/types';
import CustomIcon from '../components/CustomIcon';

const errorMessages = {
    start: 'Tezos Address start wtih tz',
    short: 'This address is too short. Tezos Addresses are 42 characters long.',
};

const DelegateAddress = ({navigation}: DelegateAddressProps) => {
    const delegation = useSelector((state: State) => state.app.delegation);
    const [isModal, setIsModal] = useState(false);
    const [isUndelegateModal, setIsUndelegateModal] = useState(false);
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
    const onUndelegateConfirmation = () => setIsUndelegateModal(true);
    const onCancelUndelegate = () => setIsUndelegateModal(false);
    const onUndlegate = () => {
        setIsUndelegateModal(false);
        dispatch(cancelDelegation());
    }
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
    let headerTitle = 'Delegate';
    let addressTitle = 'Enter Baker Address';
    let nextTitle = 'Baker Address';

    if (delegation.length > 0) {
        headerTitle = 'Change Baker Service';
        addressTitle = 'Enter New Baker Address';
        nextTitle = 'Change Baker Address';
    }

    useEffect(() => {
        if (delegation.length > 0) {
            return;
        }
        setTimeout(() => {
            setIsModal(true);
        }, 500);
    }, []);

    return (
        <Container style={styles.container}>
            <EnterAddress
                headerTitle={headerTitle}
                addressTitle={addressTitle}
                nextTitle={nextTitle}
                errorMessages={errorMessages}
                goBack={() => navigation.goBack()}
                goNext={goNext}
                onValidAddress={onValidAddress}>
                {delegation.length > 0 && (
                    <View style={styles.undelegate}>
                        <Text
                            style={styles.undelegateText}
                            onPress={onUndelegateConfirmation}>
                            Undelegate
                        </Text>
                    </View>
                )}
            </EnterAddress>
            <Modal isVisible={isUndelegateModal} style={styles.modal}>
                <View style={styles.undelegateModalContent}>
                    <Text style={styles.typo1}>Undelegate Confirmation</Text>
                    <View style={styles.undelegateActions}>
                        <Button transparent style={styles.btn} onPress={onCancelUndelegate}>
                            <View>
                                <Text style={[styles.btnEndText, styles.btnNext]}>Cancel</Text>
                            </View>
                        </Button>
                        <Button
                            transparent
                            style={[styles.btn, styles.btnEnd]}
                            onPress={onUndlegate}>
                            <View>
                                <Text style={styles.btnEndText}>Undelegate</Text>
                            </View>
                        </Button>
                    </View>
                </View>
            </Modal>
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
    undelegate: {
        marginTop: 30,
        alignItems: 'center',
    },
    undelegateText: {
        textDecorationLine: 'underline',
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
    },
    undelegateModalContent: {
        backgroundColor: '#ffffff',
        height: '35%',
        marginTop: 'auto',
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    undelegateActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 75,
        width: '100%',
        paddingHorizontal: 30,
    },
    undelegateCancelText: {
        color: '#4b4b4b'
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
