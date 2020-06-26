/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Button, Text, View, Header} from 'native-base';
import * as Keychain from 'react-native-keychain';
import {useSelector, useDispatch} from 'react-redux';

import {getAccount} from '../reducers/app/thunks';

import Transactions from '../components/Transactions';
import Delegation from '../components/Delegation';
import Receive from '../../assets/receive.svg';
import Send from '../../assets/send.svg';

import CustomIcon from '../components/CustomIcon';
import {truncateHash} from '../utils/general';

const Account = ({navigation}) => {
    const dispatch = useDispatch();
    const publicKeyHash = useSelector((state) => state.app.publicKeyHash);
    const balance = useSelector((state) => state.app.balance);
    const [tab, setTab] = useState(0);

    const changeTab = (newTab) => {
        if (newTab === tab) {
            return;
        }

        setTab(newTab);
    };

    // navigation.navigate('Welcome');

    useEffect(() => {
        async function load() {
            try {
                const wallet = await Keychain.getGenericPassword();
                if (wallet) {
                    dispatch(getAccount());
                } else {
                    navigation.replace('Welcome');
                }
            } catch (error) {
                console.log("Keychain couldn't be accessed!", error);
            }
        }
        load();
    }, []);

    const onPress = (value) => {
        navigation.navigate(value);
    };

    return (
        <Container style={styles.container}>
            <View style={styles.top}>
                <Header transparent />
                <View style={styles.account}>
                    <Text style={styles.typo1}>{`My account (${truncateHash(
                        publicKeyHash,
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
                    <View style={[styles.center, styles.row]}>
                        <Text style={styles.typo2}>{balance}</Text>
                        <CustomIcon name="XTZ" size={30} color="#1a1919" />
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.typo3}>$0.00</Text>
                    </View>
                    <Text>Hello World</Text>
                </View>
                <View style={styles.actions}>
                    <View style={styles.center}>
                        <Button transparent onPress={() => onPress('Receive')}>
                            <View style={styles.actionCircle}>
                                <Receive />
                            </View>
                        </Button>
                        <Text style={[styles.actionLabel, styles.typo4]}>
                            Receive
                        </Text>
                    </View>
                    <View style={styles.center}>
                        <Button
                            transparent
                            onPress={() => onPress('SendAddress')}>
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
    row: {
        flexDirection: 'row',
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
