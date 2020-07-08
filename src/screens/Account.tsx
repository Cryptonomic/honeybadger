/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Button, Text, View, Header} from 'native-base';
import * as Keychain from 'react-native-keychain';
import {useSelector, useDispatch} from 'react-redux';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import {syncAccount} from '../reducers/app/thunks';

import Transactions from '../components/Transactions';
import Delegation from '../components/Delegation';
import SecurityLevelButton from '../components/SecurityLevelButton';
import Receive from '../../assets/receive.svg';
import Send from '../../assets/send.svg';

import CustomIcon from '../components/CustomIcon';
import {truncateHash} from '../utils/general';
import {formatAmount} from '../utils/currency';

import {State} from '../reducers/types';
import {AccountProps} from './types';

const Account = ({navigation}: AccountProps) => {
    const dispatch = useDispatch();
    const publicKeyHash = useSelector(
        (state: State) => state.app.publicKeyHash,
    );
    const balance = useSelector((state: State) => state.app.balance);
    const transactions = useSelector((state: State) => state.app.transactions);
    const delegations = useSelector((state: State) => state.app.delegations);
    const [tab, setTab] = useState(0);
    const [openSettings, setOpenSettings] = useState(false);

    const changeTab = (newTab: number) => {
        if (newTab === tab) {
            return;
        }

        setTab(newTab);
    };

    useEffect(() => {
        async function load() {
            try {
                const wallet = await Keychain.getGenericPassword();
                if (wallet) {
                    dispatch(syncAccount());
                    setTimeout(() => {
                        load();
                    }, 100000);
                } else {
                    navigation.replace('Welcome');
                }
            } catch (error) {
                console.log("Keychain couldn't be accessed!", error);
            }
        }
        load();
    }, []);

    const onPress = (value: string) => {
        navigation.navigate(value);
    };

    const onSettingsSelect = (item) => {
        setOpenSettings(false);
        navigation.navigate(item.title);
    };

    const onLogout = (item) => {
        setOpenSettings(false);
        Keychain.resetGenericPassword();
        navigation.navigate('Welcome');
    };

    const menuItems = [
        {title: 'Settings', action: onSettingsSelect},
        {title: 'Logout', action: onLogout},
    ];

    return (
        <Container style={styles.container}>
            <Header transparent />
            <View>
                <View style={styles.account}>
                    {/*<Text style={styles.typo1}>{`My account (${truncateHash(
                        publicKeyHash,
                    )})`}</Text>*/}
                    <Menu
                        opened={openSettings}
                        onBackdropPress={() => setOpenSettings(false)}
                        style={styles.menu}>
                        <MenuTrigger
                            customStyles={{
                                TriggerTouchableComponent: () => (
                                    <Button
                                        style={styles.menuBtn}
                                        transparent
                                        onPress={() => setOpenSettings(true)}>
                                        <View style={styles.icon}>
                                            <View style={styles.dot} />
                                            <View style={styles.dot} />
                                            <View style={styles.dot} />
                                        </View>
                                    </Button>
                                ),
                            }}
                        />
                        <MenuOptions optionsContainerStyle={styles.menuOptions}>
                            {menuItems.map((item, index) => (
                                <MenuOption
                                    onSelect={() => item.action(item)}
                                    value={item.title}
                                    text={item.title}
                                    key={item.title}
                                    customStyles={{
                                        optionWrapper:
                                            index === menuItems.length - 1
                                                ? styles.menuOption
                                                : [
                                                      styles.menuOption,
                                                      styles.menuLastItem,
                                                  ],
                                        optionText: styles.typo5,
                                    }}
                                />
                            ))}
                        </MenuOptions>
                    </Menu>
                </View>
                <View style={styles.amount}>
                    <View style={[styles.center, styles.row]}>
                        <Text style={styles.typo2}>
                            {formatAmount(balance)}
                        </Text>
                        <CustomIcon name="XTZ" size={30} color="#1a1919" />
                    </View>
                    {/*<View style={styles.center}>
                        <Text style={styles.typo3}>$0.00</Text>
                    </View>*/}
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
                {/*((transactions.length > 0 && tab === 0) ||
                    (delegations.length > 0 && tab === 1)) && (
                    <View style={styles.securityBtn}>
                        <SecurityLevelButton />
                    </View>
                )*/}
                <View style={styles.tabs}>
                    <View
                        style={[
                            styles.tab,
                            tab === 0
                                ? styles.tabBorderActive
                                : styles.tabBorderInactive,
                        ]}>
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
                        style={[
                            styles.tab,
                            tab === 1
                                ? styles.tabBorderActive
                                : styles.tabBorderInactive,
                        ]}>
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
    bottom: {
        marginTop: 25,
        backgroundColor: '#ffffff',
        flex: 1,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        alignItems: 'center',
    },
    menu: {
        marginRight: 25,
    },
    menuOptions: {
        width: 200,
        borderRadius: 11,
        padding: 15,
        right: 20,
        position: 'absolute',
    },
    menuOption: {
        paddingVertical: 20,
    },
    menuLastItem: {
        borderBottomColor: '#e6e4e4',
        borderBottomWidth: 1,
    },
    menuBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 0,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 5,
        backgroundColor: '#000000',
        margin: 2,
    },
    account: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    amount: {
        marginTop: 20,
    },
    actions: {
        marginTop: 50,
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
        marginTop: 5,
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
        width: '90%',
    },
    tabActive: {
        color: 'rgba(0, 0, 0, 0.92)',
    },
    tabInactive: {
        color: 'rgb(125, 124, 124)',
    },
    tabBorderActive: {
        borderBottomColor: '#f1c20e',
    },
    tabBorderInactive: {
        borderBottomColor: '#e8e8e8',
    },
    securityBtn: {
        marginVertical: 20,
        width: '90%',
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
    typo5: {
        fontFamily: 'Roboto-Light',
        fontWeight: '300',
        fontSize: 16,
        letterSpacing: 0.67,
    },
});

export default Account;

/*


width: 63px;
height: 19px;
color: rgb(13, 13, 13);
font-size: 16px;
font-family: Roboto-Light;
font-weight: 300;
letter-spacing: 0.67px;

*/
