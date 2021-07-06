import * as React from 'react';
import {useState} from 'react';
import {Container, View, Text, Input, Button} from 'native-base';
import {ScrollView, StyleSheet, Image} from 'react-native';

import CustomHeader from '../components/CustomHeader';

import {NavigationProps} from '../screens/types';

const NFTConfirm = ({navigation}: NavigationProps) => {
    return (
        <Container>
            <CustomHeader
                title="Confirm Transaction"
                onBack={() => navigation.goBack()}
            />
            <ScrollView style={s.container} contentContainerStyle={s.grow}>
                <Text style={s.info}>
                    Please review your transaction and ensure that the details
                    are correct.
                </Text>
                <Text style={s.label}>SEND OBJKT #24562</Text>
                <View style={s.paper}>
                    <Image style={s.image} />
                    <Text style={s.title}>Title</Text>
                    <Text style={s.address}>{`By Address`}</Text>
                </View>
                <Text style={[s.section, s.first]}>From</Text>
                <Text style={[s.info, s.details]}>navi.tez</Text>
                <Text style={[s.section, s.first]}>To</Text>
                <Text style={[s.info, s.details]}>tz3adc...tDFTLv</Text>
                <Text style={[s.section, s.first]}>Quantity</Text>
                <Text style={[s.info, s.details]}>1 X</Text>
                <View style={s.feeWrapper}>
                    <Text style={s.fee}>Transaction Fee</Text>
                    <Text style={s.feeValue}>0.059 XTZ ($0.02)</Text>
                </View>
                <View style={s.buttons}>
                    <Button style={[s.btn, s.edit]}>
                        <Text style={s.editText}>Edit</Text>
                    </Button>
                    <Button style={[s.btn, s.confirm]}>
                        <Text>Confirm</Text>
                    </Button>
                </View>
            </ScrollView>
        </Container>
    );
};

const s = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
    },
    grow: {
        flexGrow: 1,
    },
    info: {
        fontSize: 16,
        letterSpacing: -0.3,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 16,
    },
    paper: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        width: '100%',
        height: 245,
        marginTop: 8,
        padding: 16,
    },
    image: {
        width: '100%',
        height: 180,
        borderWidth: 1,
        borderRadius: 8,
    },
    title: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 6,
    },
    address: {
        fontSize: 12,
        color: '#4B4B4B',
    },
    section: {
        fontSize: 12,
        fontWeight: '500',
        color: '#909090',
        marginTop: 8,
    },
    details: {
        marginTop: 4,
    },
    first: {
        marginTop: 8,
    },
    feeWrapper: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        height: 72,
        marginTop: 20,
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 13,
    },
    fee: {
        fontSize: 12,
        fontWeight: '500',
        color: '#909090',
    },
    feeValue: {
        marginTop: 6,
        fontSize: 16,
        letterSpacing: -0.3,
    },
    buttons: {
        marginTop: 26,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        width: 164,
        height: 39,
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    edit: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#909090',
    },
    confirm: {
        backgroundColor: '#4B4B4B',
    },
    editText: {
        color: '#000000',
    },
});

export default NFTConfirm;
