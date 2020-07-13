import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container} from 'native-base';

import {setSendAddress} from '../reducers/app/actions';

import EnterAddress from '../components/EnterAddress';
import {colors} from '../theme';

import {State, Operation} from '../reducers/types';
import {SendAddressProps} from './types';

const errorMessages = {
    start: 'Tezos address start with tz',
    length: 'This address is too short. Tezos addresses are 36 characters long.',
};

const SendAddress = ({navigation}: SendAddressProps) => {
    const dispatch = useDispatch();
    const transactions = useSelector((state: State) => state.app.transactions);
    const publicKeyHash = useSelector(
        (state: State) => state.app.publicKeyHash,
    );
    const goNext = () => {
        const isSomeSendTransaction = transactions.find(
            (t: Operation) =>
                t.source === publicKeyHash && Number(t.amount) > 0,
        );
        navigation.navigate(
            isSomeSendTransaction ? 'SendAmount' : 'SendFirstTime',
        );
    };
    const onValidAddress = (value: string) => {
        dispatch(setSendAddress(value));
    };

    return (
        <Container style={styles.container}>
            <EnterAddress
                headerTitle="Send"
                addressTitle="Enter Recipient Address"
                nextTitle="Recipient Address"
                errorMessages={errorMessages}
                goBack={() => navigation.goBack()}
                goNext={goNext}
                onValidAddress={onValidAddress}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bg,
    },
});

export default SendAddress;
