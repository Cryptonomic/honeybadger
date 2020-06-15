/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Button, Text, View, Header} from 'native-base';
// import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
// import {Snackbar} from 'react-native-paper';
// import TransportHID from '@ledgerhq/react-native-hid';
import {TezosConseilClient} from 'conseiljs';
// import {KeyStoreUtils} from 'conseiljs-ledgersigner';
import * as Keychain from 'react-native-keychain';

// import {
//     LearnMoreLinks,
//     Colors,
//     DebugInstructions,
//     ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import Transactions from '../components/Transactions';
import Delegation from '../components/Delegation';
import Receive from '../../assets/receive.svg';
import Send from '../../assets/send.svg';

import {truncateHash} from '../utils/general';

const serverInfo = {
    url: 'https://conseil-dev.cryptonomic-infra.tech:443',
    apiKey: 'galleon',
    network: 'carthagenet',
};

const derivationPath = "44'/1729'/0'/0'/0'";

const Account = ({navigation}) => {
    const [text, setText] = useState('tz3gN8NTLNLJg5KRsUU47NHNVHbdhcFXjjaB');
    const [balance, setBalance] = useState(0);
    const [secureTxt, setSecureTxt] = useState('');
    const [localHash, setLocalHash] = useState('');
    const [pkh, setPkh] = useState('');
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState(0);

    // async function onSaveToStorage() {
    //     const result = await RNSecureStorage.set('hash', secureTxt, {
    //         accessible: ACCESSIBLE.WHEN_UNLOCKED,
    //     });
    //     console.log('save------', result);
    // }

    // async function onGetFromStorage() {
    //     const newHash = await RNSecureStorage.get('hash');
    //     if (newHash) {
    //         setLocalHash(newHash);
    //     }
    // }
    // async function onGetLederAddress() {
    //     const devicesList = await TransportHID.list();
    //     if (devicesList.length === 0) {
    //         setOpen(true);
    //     } else {
    //         const newKeyStore = await KeyStoreUtils.unlockAddress(
    //             derivationPath,
    //         ).catch(() => {
    //             return {
    //                 publicKeyHash: '',
    //             };
    //         });
    //         setPkh(newKeyStore.publicKeyHash);
    //     }
    // }

    const changeTab = newTab => {
        if (newTab === tab) {
            return;
        }

        setTab(newTab);
    };

    useEffect(() => {
        async function getBalance() {
            const newBal = await TezosConseilClient.getAccount(
                serverInfo,
                serverInfo.network,
                text,
            ).catch(() => {
                return {balance: 0};
            });
            setBalance(newBal.balance);
        }
        async function load() {
            try {
                const wallet = await Keychain.getGenericPassword();
                if (wallet) {
                    console.log('wallet', wallet);
                    getBalance();
                } else {
                    navigation.replace('Welcome');
                }
            } catch (error) {
                console.log("Keychain couldn't be accessed!", error);
            }
        }
        load();
    }, []);

    return (
        <Container style={styles.container}>
            <View style={styles.top}>
                <Header transparent />
                <View style={styles.account}>
                    <Text style={styles.typo1}>{`My account (${truncateHash(
                        text,
                    )})`}</Text>
                    <Button style={styles.menu} transparent>
                        <View style={styles.icon}>
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>
                    </Button>
                </View>
                <View style={styles.amount}>
                    <View style={styles.center}>
                        <Text style={styles.typo2}>{balance}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.typo3}>$0.00</Text>
                    </View>
                </View>
                <View style={styles.actions}>
                    <View style={styles.center}>
                        <Button transparent>
                            <View style={styles.actionCircle}>
                                <Receive />
                            </View>
                        </Button>
                        <Text style={[styles.actionLabel, styles.typo4]}>
                            Receive
                        </Text>
                    </View>
                    <View style={styles.center}>
                        <Button transparent>
                            <View style={styles.actionCircle}>
                                <Send />
                            </View>
                        </Button>
                        <Text style={[styles.actionLabel, styles.typo4]}>
                            Send
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.tabs}>
                    <View
                        style={styles.tab}
                        borderBottomColor={tab === 0 ? '#f1c20e' : '#e8e8e8'}>
                        <Button
                            style={styles.center}
                            transparent
                            onPress={() => changeTab(0)}>
                            <Text
                                style={[
                                    styles.typo3,
                                    tab === 0
                                        ? styles.tabActive
                                        : styles.tabInactive,
                                ]}>
                                Transactions
                            </Text>
                        </Button>
                    </View>
                    <View
                        style={styles.tab}
                        borderBottomColor={tab === 1 ? '#f1c20e' : '#e8e8e8'}>
                        <Button
                            style={styles.center}
                            transparent
                            onPress={() => changeTab(1)}>
                            <Text
                                style={[
                                    styles.typo3,
                                    tab === 1
                                        ? styles.tabActive
                                        : styles.tabInactive,
                                ]}>
                                Delegation
                            </Text>
                        </Button>
                    </View>
                </View>
                <View style={styles.tabContainer}>
                    {tab === 0 && <Transactions />}
                    {tab === 1 && <Delegation />}
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fcd104',
    },
    top: {
        height: '45%',
    },
    bottom: {
        backgroundColor: '#ffffff',
        height: '100%',
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        alignItems: 'center',
    },
    menu: {
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
        position: 'absolute',
        right: 15,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#595252',
        margin: 2,
    },
    account: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    amount: {
        marginTop: 20,
    },
    actions: {
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 86,
        height: 86,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 86,
        margin: 20,
        padding: 25,
    },
    actionLabel: {
        marginTop: 30,
    },
    tabs: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tab: {
        borderBottomWidth: 3,
        borderRadius: 0,
        width: '50%',
        justifyContent: 'center',
    },
    tabContainer: {
        marginTop: 50,
    },
    tabActive: {
        color: 'rgba(0, 0, 0, 0.92)',
    },
    tabInactive: {
        color: 'rgb(125, 124, 124)',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    typo1: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: 'rgb(75, 75, 75)',
    },
    typo2: {
        fontFamily: 'Roboto-Medium',
        fontSize: 36,
        fontWeight: '500',
        color: 'rgb(26, 25, 25)',
    },
    typo3: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 27,
    },
    typo4: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight: 'normal',
    },
});

export default Account;

/*

            <>
            <Container style={styles.main}>
                <Item regular>
                    <Input
                        style={styles.input}
                        placeholder="Type here address!"
                        onChangeText={text => setText(text)}
                        defaultValue={text}
                    />
                </Item>
                <Text style={styles.balanceTitle}>{balance}</Text>
                <Button style={styles.button} onPress={() => getBalance()}>
                    <Text style={styles.buttonText}>Get</Text>
                </Button>
            </Container>
            <Container style={styles.main}>
                <Item regular>
                    <Input
                        style={styles.input}
                        placeholder="Type here hash!"
                        onChangeText={txt => setSecureTxt(txt)}
                        value={secureTxt}
                    />
                </Item>

                <Text style={styles.balanceTitle}>
                    Saved Value: {localHash}
                </Text>

                <Container style={styles.buttonGr}>
                    <Button
                        style={styles.secureBtn}
                        onPress={() => onSaveToStorage()}>
                        <Text style={styles.buttonText}>Save</Text>
                    </Button>
                    <Button
                        style={styles.secureBtn}
                        onPress={() => onGetFromStorage()}>
                        <Text style={styles.buttonText}>Get Some data</Text>
                    </Button>
                </Container>
            </Container>
        </>

            <Container style={styles.main}>
                <Text style={styles.balanceTitle}>PublicKeyHash: {pkh}</Text>

                <Button
                    style={styles.button}
                    onPress={() => onGetLederAddress()}>
                    <Text style={styles.buttonText}>Connect Ledger</Text>
                </Button>
            </Container>

            <Snackbar
                visible={open}
                duration={3000}
                onDismiss={() => setOpen(false)}>
                Ledger device not found
            </Snackbar>


            input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 3,
    },
    main: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: Colors.white,
        justifyContent: 'center',
    },
    balanceTitle: {
        marginTop: 32,
        fontSize: 24,
    },
    button: {
        marginTop: 32,
    },
    buttonText: {
        width: '100%',
        textAlign: 'center',
    },
    buttonGr: {
        flexDirection: 'row',
        marginTop: 32,
        justifyContent: 'space-between',
    },
    secureBtn: {
        width: '40%',
    },

*/
