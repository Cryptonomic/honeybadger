import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Button, Container} from 'native-base';

import CustomHeader from '../components/CustomHeader';
import CustomIcon from '../components/CustomIcon';
import {colors} from '../theme';
import {SettingsProps} from './types';
import config from '../config';

const Settings = ({navigation}: SettingsProps) => {
    const list = [
        {
            title: 'App',
            items: [
                {name: `Version: ${config[0].version}`},
                {name: `Network: ${config[0].displayNetwork}`},
            ],
        },
        {
            title: 'Help',
            items: [
                {name: 'FAQ', action: () => {}},
                {name: 'Support', action: () => {}},
            ],
        },
        {
            title: 'Legal',
            items: [
                {name: 'Terms and Conditions', action: () => {}},
                {name: 'Privacy Policy', action: () => {}},
            ],
        },
    ];

    return (
        <Container style={styles.container}>
            <CustomHeader title="Settings" onBack={() => navigation.goBack()} />
            <View style={styles.content}>
                {list.map(({title, items}) => (
                    <View style={styles.section}>
                        <View style={styles.item}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>{title}</Text>
                            </View>
                        </View>
                        {items.map(({name, action}) => {
                            const children = (
                                <>
                                    <View>
                                        <Text style={styles.btnText}>
                                            {name}
                                        </Text>
                                    </View>
                                    {action && (
                                        <CustomIcon
                                            name="Caret-Left"
                                            size={15}
                                            color="#909090"
                                        />
                                    )}
                                </>
                            );
                            return (
                                <View style={styles.item}>
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
    btnText: {
        fontFamily: 'Roboto-Light',
        fontWeight: '300',
        fontSize: 16,
        color: '#0d0d0d',
        letterSpacing: 0.67,
    },
});

export default Settings;
