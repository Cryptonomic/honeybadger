import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, View} from 'native-base';

import CustomIcon from '../CustomIcon';

import {CustomButtonProps} from './types';

const CustomButton = ({
    label,
    icon,
    size = 35,
    color = '#000000',
    onPress,
}: CustomButtonProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Button style={styles.button} onPress={onPress} transparent>
                    <CustomIcon name={icon} size={size} color={color} />
                </Button>
            </View>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 15,
        textAlign: 'center',
    },
});

export default CustomButton;
