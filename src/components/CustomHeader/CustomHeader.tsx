import React from 'react';
import {StyleSheet} from 'react-native';
import {Header, Button, Left, Right, Title, Body} from 'native-base';

import CustomIcon from '../CustomIcon';

const CustomHeader = ({title, goBack, onClose}) => {
    return (
        <Header transparent>
            <Left style={styles.button}>
                <Button transparent onPress={goBack}>
                    <CustomIcon name="Back-Arrow" size={16} />
                </Button>
            </Left>
            <Body>
                <Title style={styles.title}>{title}</Title>
            </Body>
            <Right style={styles.button}>
                <Button transparent onPress={onClose}>
                    <CustomIcon name="Cancel" size={16} />
                </Button>
            </Right>
        </Header>
    );
};

const styles = StyleSheet.create({
    button: {
        flexGrow: 0,
        flexBasis: 50,
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0.83,
    },
});

export default CustomHeader;
