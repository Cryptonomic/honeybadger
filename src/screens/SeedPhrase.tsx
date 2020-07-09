import React, {useState} from 'react';
import {StyleSheet, Clipboard} from 'react-native';
import {View, Text, Container, Button} from 'native-base';
import {useSelector} from 'react-redux';

import CustomHeader from '../components/CustomHeader';
import CustomTooltip from '../components/CustomTooltip';
import CustomIcon from '../components/CustomIcon';
import {colors} from '../theme';

import {KeysProps} from './types';
import {State} from '../reducers/types';

const SeedPhrase = ({navigation}: KeysProps) => {
    const seed = useSelector((state: State) => state.app.seed);
    const [copied, setCopied] = useState(false);
    const arr = seed.split(' ');
    const half = arr.length / 2;
    const cols = [arr.slice(0, half), arr.slice(half)];

    const onCopyToClipboard = () => {
        Clipboard.setString(seed);
        setCopied(true);
    };

    return (
        <Container style={styles.container}>
            <CustomHeader
                title="Seed Phrase"
                onBack={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>
                        Write down your seed phrase on a piece of paper and keep
                        it in a safe place. You will need your seed phrase to
                        recover your account.
                    </Text>
                </View>
                <View style={styles.seed}>
                    {cols.map((col, colIndex) => (
                        <View style={styles.column}>
                            {col.map((value, rowIndex) => (
                                <View style={styles.row}>
                                    <View style={styles.seedNumberWrapper}>
                                        <Text style={styles.seedNumber}>{`${
                                            (colIndex
                                                ? half + 1
                                                : colIndex + 1) + rowIndex
                                        }.`}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.seedText}>
                                            {value}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>
                <View style={styles.action}>
                    <CustomTooltip
                        isVisible={copied}
                        placement="center"
                        positions={{top: 0, right: 0, bottom: 0, left: 0}}
                        content={
                            <View style={styles.tooltipContent}>
                                <CustomIcon name="Checkmark" size={16} />
                                <Text style={styles.tooltipText}>
                                    Copied to the clipboard
                                </Text>
                            </View>
                        }
                        onClose={() => setCopied(false)}>
                        <Button
                            transparent
                            style={styles.btn}
                            onPress={onCopyToClipboard}>
                            <View>
                                <Text style={styles.btnText}>
                                    Copy Seed Phrase
                                </Text>
                            </View>
                        </Button>
                    </CustomTooltip>
                </View>
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
        paddingHorizontal: 40,
    },
    title: {
        marginTop: 50,
    },
    titleText: {
        fontFamily: 'Roboto-Light',
        fontSize: 18,
        fontWeight: '300',
        lineHeight: 24,
    },
    seed: {
        flexDirection: 'row',
        marginTop: 75,
    },
    seedText: {
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        fontSize: 18,
        color: '#0d0d0d',
        letterSpacing: 0.75,
        marginLeft: 20,
    },
    seedNumber: {
        fontFamily: 'Roboto-Medium',
        fontWeight: '500',
        fontSize: 18,
        color: 'rgb(75, 75, 75)',
        letterSpacing: 0.75,
    },
    seedNumberWrapper: {
        width: 30,
    },
    column: {
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        width: '50%',
    },
    row: {
        width: '80%',
        flexDirection: 'row',
    },
    action: {
        marginTop: 150,
        alignItems: 'center',
    },
    btn: {
        width: 256,
        height: 50,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4b4b4b',
    },
    btnText: {
        color: '#ffffff',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        letterSpacing: 0.85,
    },
    tooltipContent: {
        width: 'auto',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    tooltipText: {
        marginLeft: 5,
    },
});

export default SeedPhrase;
