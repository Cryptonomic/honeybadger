import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import SafeContainer from '../../components/SafeContainer';

import {BeaconConnectionRequestProps} from '../../screens/types';
import {State} from '../../reducers/types';

import getBeaconTemplate from '../';

const BeaconAuthorization = ({navigation}: BeaconConnectionRequestProps) => {
    const { id, operationDetails, website, network, appMetadata } = useSelector((state: State) => state.beacon.beaconMessage);
    const isContract = String(operationDetails[0].destination).startsWith('KT1'); // TODO: // recognize contract call and simple transaction
    const { destination, amount, parameters } = operationDetails[0];
    const operationParameters = parameters || { value: { prim: 'Unit' }, entrypoint: 'default' };

    return (
        <View style={s.container}>
            <SafeContainer>
                <Text>BeaconAthorization</Text>
                {getBeaconTemplate(operationDetails[0])}
            </SafeContainer>
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default BeaconAuthorization;

