import React from 'react';
import {StyleSheet} from 'react-native';
import {Header, Button, Left, Right, Title, Body} from 'native-base';

import CustomIcon from '../CustomIcon';

const CustomHeader = ({title, goBack}) => {
    return (
        <Header style={styles.header} transparent>
            <Left>
                <Button transparent onPress={goBack}>
                    <CustomIcon name="Back-Arrow" size={16} />
                </Button>
            </Left>
            <Body>
                <Title style={styles.title}>{title}</Title>
            </Body>
            <Right>
                <Button transparent onPress={goBack}>
                    <CustomIcon name="Cancel" size={16} />
                </Button>
            </Right>
        </Header>
    );
};

const styles = StyleSheet.create({
    header: {
        marginHorizontal: 10,
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
