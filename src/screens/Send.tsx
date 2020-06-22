import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container, Header} from 'native-base';

import CustomHeader from '../components/CustomHeader';
// import SendFirstStep from '../components/SendFirstStep';
// import SendSecondStep from '../components/SendSecondStep';
import SendFirstTime from '../components/SendFirstTime';
import {colors} from '../theme';

const Send = ({navigation}) => {
    const sendStep = useSelector((state) => state.app.sendStep);
    const firstTime = useState(true);
    return (
        <Container style={styles.container}>
            {firstTime ? (
                <Header transparent />
            ) : (
                <CustomHeader title="Send" goBack={() => navigation.goBack()} />
            )}
            {/* <SendFirstStep /> */}
            {/* <SendSecondStep /> */}
            {firstTime && <SendFirstTime />}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
    },
});

export default Send;
