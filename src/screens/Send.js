import React from 'react';
import {StyleSheet} from 'react-native';
import {Container} from 'native-base';

import CustomHeader from '../components/CustomHeader';
import SendFirstStep from '../components/SendFirstStep';
import {colors} from '../theme';

const Send = ({navigation}) => {
    return (
        <Container style={styles.container}>
            <CustomHeader title="Send" goBack={() => navigation.goBack()} />
            <SendFirstStep />
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
    },
});

export default Send;
