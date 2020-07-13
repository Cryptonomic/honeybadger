import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'native-base';
import {useDispatch} from 'react-redux';

import {getPendingTransaction} from '../reducers/app/thunks';
import CustomIcon from '../components/CustomIcon';

const PendingTransaction = () => {
    const dispatch = useDispatch();
    const getPending = () => {
        dispatch(getPendingTransaction())
    };
    return (
        <View style={styles.container}>
            <CustomIcon name="Sand-Timer" size={20} />
            <View>
                <Text onPress={getPending}>PendingTransaction</Text>
                <Text>to address</Text>
            </View>
            <CustomIcon name="New-Window" size={10} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 69,
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#eeeded',
        borderRadius: 9,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 1,
    },
});

export default PendingTransaction;
