import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import SafeContainer from '../components/SafeContainer';

import {BeaconConnectionRequestProps} from './types';

const BeaconAuthorization = ({navigation}: BeaconConnectionRequestProps) => {
    return (
        <View style={s.container}>
            <SafeContainer>
                <Text>BeaconAthorization</Text>
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

