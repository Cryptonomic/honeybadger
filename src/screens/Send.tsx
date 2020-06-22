import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container} from 'native-base';

import CustomHeader from '../components/CustomHeader';
import SendFirstStep from '../components/SendFirstStep';
import SendSecondStep from '../components/SendSecondStep';
import {colors} from '../theme';

const Send = ({navigation}) => {
    const sendStep = useSelector((state) => state.app.sendStep);
    return (
        <Container style={styles.container}>
            <CustomHeader title="Send" goBack={() => navigation.goBack()} />
            <SendFirstStep />
            {/* <SendSecondStep /> */}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
    },
});

export default Send;
