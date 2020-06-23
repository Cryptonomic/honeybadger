import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, View} from 'native-base';

import CustomIcon from '../CustomIcon';

const CustomButton = ({label, icon, size = 35, color = '#000000'}) => {
    return (
        <View style={styles.container}>
            <Button style={styles.button}>
                <CustomIcon name={icon} size={size} color={color} />
            </Button>
            <Text style={styles.text}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
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