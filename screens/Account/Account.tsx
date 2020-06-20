import React, { useState, useEffect } from 'react';
import { Container, Button, Text, View, Header } from 'native-base';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {Snackbar} from 'react-native-paper';
//import TransportHID from '@ledgerhq/react-native-hid';
import {TezosConseilClient} from 'conseiljs';
//import {KeyStoreUtils} from 'conseiljs-ledgersigner';

import styles from './styles'

import {
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Transactions from '../../components/Transactions';
import Delegation from '../../components/Delegation';
import Receive from '../../assets/receive.svg';
import Send from '../../assets/send.svg';

const serverInfo = {
    url: 'https://conseil-dev.cryptonomic-infra.tech:443',
    apiKey: 'galleon',
    network: 'carthagenet',
};

const derivationPath = "44'/1729'/0'/0'/0'";

const Account = ({navigation} : any) => {
    const [text, setText] = useState('tz3gN8NTLNLJg5KRsUU47NHNVHbdhcFXjjaB');
    const [balance, setBalance] = useState(0);
    const [secureTxt, setSecureTxt] = useState('');
    const [localHash, setLocalHash] = useState('');
    const [pkh, setPkh] = useState('');
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState(0);

    async function getBalance() {
        const newBal = await TezosConseilClient.getAccount(
            serverInfo,
            serverInfo.network,
            text,
        ).catch(err => {
            return {balance: 0};
        });
        setBalance(newBal.balance);
    }

    async function onSaveToStorage() {
        const result = await RNSecureStorage.set('hash', secureTxt, {
            accessible: ACCESSIBLE.WHEN_UNLOCKED,
        });
        console.log('save------', result);
    }

    async function onGetFromStorage() {
        const newHash = await RNSecureStorage.get('hash');
        if (newHash) {
            setLocalHash(newHash);
        }
    }

    /*async function onGetLederAddress() {
        const devicesList = await TransportHID.list();
        if (devicesList.length === 0) {
            setOpen(true);
        } else {
            const newKeyStore = await KeyStoreUtils.unlockAddress(
                derivationPath,
            ).catch(() => {
                return {
                    publicKeyHash: '',
                };
            });
            setPkh(newKeyStore.publicKeyHash);
        }
    }*/

    const changeTab = (newTab : any) => {
        if (newTab === tab) {
            return;
        }

        setTab(newTab);
    };

    useEffect(() => {
        getBalance();
    }, []);

    // navigation.replace('Welcome')

    return (
        <Container style={styles.container}>
            <View style={styles.top}>
                <Header transparent />
                <View style={styles.account}>
                    <Text>{`My account (tz3gN8NTLN)`}</Text>
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
                        <Text>{balance}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text>$0.00</Text>
                    </View>
                </View>
                <View style={styles.actions}>
                    <View style={styles.center}>
                        <Button transparent>
                            <View style={styles.actionCircle}>
                                <Receive />
                            </View>
                        </Button>
                        <Text style={styles.actionLabel}>Receive</Text>
                    </View>
                    <View style={styles.center}>
                        <Button transparent>
                            <View style={styles.actionCircle}>
                                <Send />
                            </View>
                        </Button>
                        <Text style={styles.actionLabel}>Send</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
                <View style={styles.tabs}>
                    <View
                        style={styles.tab}>
                        <Button
                            style={styles.center}
                            transparent
                            onPress={() => changeTab(0)}>
                            <Text>Transactions</Text>
                        </Button>
                    </View>
                    <View
                        style={styles.tab}>
                        <Button
                            style={styles.center}
                            transparent
                            onPress={() => changeTab(1)}>
                            <Text>Delegation</Text>
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
