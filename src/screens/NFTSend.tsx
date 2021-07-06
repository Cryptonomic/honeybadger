import * as React from 'react';
import {useState} from 'react';
import {Container, View, Text, Input, Button} from 'native-base';
import {ScrollView, StyleSheet, Image} from 'react-native';

import CustomHeader from '../components/CustomHeader';

import {NavigationProps} from '../screens/types';

const NFTSend = ({navigation}: NavigationProps) => {
    const [address, setAddress] = useState('');

    const onChangeAddress = (text: string) => setAddress(text);

    return (
        <Container>
            <CustomHeader title="Send NFT" onBack={() => navigation.goBack()} />
            <ScrollView style={s.container} contentContainerStyle={s.grow}>
                <Text>To</Text>
                <View style={s.inputWrapper}>
                    <Input
                        style={s.input}
                        value={address}
                        onChangeText={onChangeAddress}
                    />
                </View>
                <View style={s.paper}>
                    <Image style={s.image} />
                    <Text style={s.title}>Title</Text>
                    <Text style={s.address}>{`By Address`}</Text>
                </View>
                <Text style={s.quantity}>Quantity</Text>
                <View style={s.row}>
                    <Button style={s.btn} />
                    <Text>1</Text>
                    <Button style={s.btn} />
                    <Text>of 5</Text>
                </View>
                <Button style={s.next}>
                    <Text>Next</Text>
                </Button>
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
    label: {
        fontSize: 16,
        letterSpacing: -0.3,
        color: '#4B4B4B',
    },
    inputWrapper: {
        width: '100%',
        height: 56,
        marginTop: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#2900DB',
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
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
        marginTop: 32,
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
    quantity: {
        fontSize: 16,
        marginTop: 32,
    },
    btn: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9C000',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    next: {
        marginTop: 100,
        width: 256,
        height: 48,
        backgroundColor: '#4B4B4B',
        borderRadius: 25,
        justifyContent: 'center',
        alignSelf: 'center',
    },
});

export default NFTSend;
