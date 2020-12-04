import React, {useEffect, useState} from 'react';
import {StyleSheet, Linking, ScrollView} from 'react-native';
import {Text, View, Button, Container, Switch, Toast} from 'native-base';
import DeviceInfo from 'react-native-device-info';
import * as Keychain from 'react-native-keychain';

import CustomHeader from '../components/CustomHeader';
import CustomIcon from '../components/CustomIcon';
import {colors} from '../theme';
import config from '../config';
import Success from '../../assets/success.svg';

import {SettingsProps} from './types';

const Settings = ({navigation}: SettingsProps) => {
    const [securitySetup, setSecuritySetup] = useState(false);

    useEffect(() => {
        navigation.addListener(
            'didFocus', async (payload: any) => {
                try {
                    let data: any= await Keychain.getInternetCredentials('securitySetup');
                    data = JSON.parse(data.password);
                    if (data.hasOwnProperty('securitySetup') && data.securitySetup) {
                        setSecuritySetup(data.securitySetup)
                    } else {
                        setSecuritySetup(false);
                    }
                } catch (error) {
                    // error
                }
            }
        )

    }, [navigation]);

    const toggleAppLock = async () => {
        if (securitySetup) {
            let data: any= await Keychain.getInternetCredentials('securitySetup');
            data = JSON.parse(data.password);
            const setup = {
                securitySetup: false,
                isBiometric: false,
                pin: '',
                phraseBackedUp: data.phraseBackedUp
            }
            await Keychain.setInternetCredentials(
                'securitySetup',
                'userName',
                JSON.stringify(setup)
            );
            setSecuritySetup(false);
        } else {
            navigation.navigate('AccountSetup', { fromSetting: true });
        }
    }

    const list = [
        {
            title: 'App',
            items: [
                {
                    name: `Version: ${DeviceInfo.getVersion()}, build ${DeviceInfo.getBuildNumber()}`,
                },
                {name: `Network: ${config[0].displayNetwork}`},
            ],
        },
        {
            title: 'Security',
            items: [
                {
                    name: 'Show Recovery Phrase',
                    action: () => navigation.navigate('SeedPhrase', { fromSetting: true }),
                },
                {
                    name: 'Enable App Lock',
                    isSwitch: true,
                    action: () => navigation.navigate('AccountSetup'),
                },
                {
                    name: 'Security Level',
                    action: () => navigation.navigate('SecurityLevel'),
                },
                {
                    name: 'Recovery Phrase',
                    action: () => navigation.navigate('RecoveryPhrase'),
                },
            ],
        },
        {
            title: 'Help',
            items: [
                {
                    name: 'FAQ',
                    action: () => {
                        Linking.openURL(
                            'https://cryptonomic.zendesk.com/hc/en-us/sections/360007678431-FAQ',
                        );
                    },
                }, // TODO
                {
                    name: 'Support',
                    action: () => {
                        Linking.openURL(
                            'https://cryptonomic.tech/support.html',
                        );
                    },
                }, // TODO
            ],
        },
        {
            title: 'Legal',
            items: [
                {
                    name: 'Terms and Conditions',
                    action: () => {
                        Linking.openURL(
                            'https://github.com/Cryptonomic/Deployments/raw/master/Terms_of_Service.pdf',
                        );
                    },
                }, // TODO
                {
                    name: 'Privacy Policy',
                    action: () => {
                        Linking.openURL(
                            'https://github.com/Cryptonomic/Deployments/raw/master/Privacy_Policy.pdf',
                        );
                    },
                }, // TODO
            ],
        },
    ];

    return (
        <Container style={styles.container}>
            <CustomHeader title="Settings" onBack={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.content}>
                    {list.map(({title, items}) => (
                        <View style={styles.section} key={title}>
                            <View style={styles.item}>
                                <View style={styles.title}>
                                    <Text style={styles.titleText}>{title}</Text>
                                </View>
                            </View>
                            {items.map(({name, action, isSwitch}) => {
                                const children = (
                                    <>
                                        <View style={styles.posRel}>
                                            <Text style={styles.btnText}>
                                                {name}
                                            </Text>
                                            {name == 'Show Recovery Phrase'? <Text  style={styles.subTitle}>Level 1: Goldfish</Text>: null }
                                            {name == 'Recovery Phrase'? <Text  style={styles.alertText}>
                                                Not backed up
                                            </Text>: null }
                                            {/* {name == 'Recovery Phrase'? <Text  style={styles.successText}>
                                                Backed up <Success style={styles.successIcon}></Success>
                                            </Text>: null } */}
                                        </View>
                                        {action && (
                                            isSwitch ?
                                            <Switch
                                                trackColor={{ false: "#333333", true: "#0dbd8b" }}
                                                thumbColor={true ? "#FFFFFF" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleAppLock}
                                                value={securitySetup}
                                            />
                                            :
                                            <CustomIcon
                                                name="Caret-Left"
                                                size={15}
                                                color="#909090"
                                            />
                                            
                                        )}
                                    </>
                                );
                                return (
                                    <View style={styles.item} key={name}>
                                        {action ? (
                                            <Button
                                                transparent
                                                style={styles.btn}
                                                onPress={action}>
                                                {children}
                                            </Button>
                                        ) : (
                                            <View style={styles.btn}>
                                                {children}
                                            </View>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
    },
    content: {
        backgroundColor: '#ffffff',
        flexGrow: 1,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        paddingHorizontal: 20,
    },
    title: {
        paddingBottom: 18,
        paddingHorizontal: 10,
    },
    section: {
        marginTop: 28,
    },
    item: {
        borderBottomWidth: 2,
        borderBottomColor: '#e6e4e4',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        width: '100%',
        height: 'auto',
        paddingTop: 21,
        paddingBottom: 18,
        paddingHorizontal: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    titleText: {
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        fontSize: 18,
        color: '#0d0d0d',
        letterSpacing: 0.75,
    },
    posRel: {
        position:'relative'
    },
    subTitle: {
        position: "absolute",
        right:-150,
        fontSize:14,
        top:2,
        color: '#909090',
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
    },
    alertText: {
        position: "absolute",
        right:-195,
        fontSize:14,
        top:2,
        color: '#FF0000',
    },
    successText: {
        position: "absolute",
        right:-200,
        fontSize:14,
        top:1,
        color: '#259C90',
    },
    successIcon: {
        marginLeft:2,
        marginTop:-3
    },
    btnText: {
        fontFamily: 'Roboto-Light',
        fontWeight: '300',
        fontSize: 16,
        color: '#0d0d0d',
        letterSpacing: 0.67,
    },
});

export default Settings;
