import React from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Container} from 'native-base';

import {setSendAddress} from '../reducers/app/actions';

import EnterAddress from '../components/EnterAddress';
import {colors} from '../theme';

import {DelegateAddressProps} from './types';

const errorMessages = {
    start: 'Tezos Address start wtih tz',
    short: 'This address is too short. Tezos Addresses are 42 characters long.',
};

const DelegateAddress = ({navigation}: DelegateAddressProps) => {
    const dispatch = useDispatch();
    const goNext = () => {
        navigation.navigate('DelegateReview');
    };
    const onValidAddress = (value: string) => {
        dispatch(setSendAddress(value));
    };

    return (
        <Container style={styles.container}>
            <EnterAddress
                headerTitle="Delegate"
                addressTitle="Enter Baker Address"
                nextTitle="Baker Address"
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

export default DelegateAddress;
