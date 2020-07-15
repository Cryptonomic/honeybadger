import React from 'react';
import {StyleSheet} from 'react-native';
import {Header, Button, Left, Right, Title, Body} from 'native-base';

import CustomIcon from '../CustomIcon';

import {CustomHeaderProps} from './types';

const CustomHeader = ({
    title,
    onBack,
    onClose,
    leftIconName = 'Back-Arrow',
    rightIconName = 'Cancel',
    backIconCustomStyles,
    closeIconCustomStyles,
}: CustomHeaderProps) => {
    const defaultIconStyles = {
        size: 16,
        color: '#000000',
    };
    const closeIconStyles = {
        ...defaultIconStyles,
        ...closeIconCustomStyles,
    };
    const backIconStyles = {
        ...defaultIconStyles,
        ...backIconCustomStyles,
    };
    return (
        <Header transparent>
            <Left style={styles.button}>
                {onBack && (
                    <Button transparent onPress={onBack}>
                        <CustomIcon
                            name={leftIconName}
                            size={backIconStyles.size}
                            color={backIconStyles.color}
                        />
                    </Button>
                )}
            </Left>
            <Body>{title && <Title style={styles.title}>{title}</Title>}</Body>
            <Right style={styles.button}>
                {onClose && (
                    <Button transparent onPress={onClose}>
                        <CustomIcon
                            name={rightIconName}
                            size={closeIconStyles.size}
                            color={closeIconStyles.color}
                        />
                    </Button>
                )}
            </Right>
        </Header>
    );
};

const styles = StyleSheet.create({
    button: {
        flexGrow: 0,
        minWidth: 50,
        maxWidth: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0.83,
        color: '#000000',
        alignSelf: 'center'
    },
});

export default CustomHeader;
