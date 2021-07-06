import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import {Container, View, Text, Button} from 'native-base';

import CustomHeader from '../components/CustomHeader';

import {NavigationProps} from '../screens/types';

const NFTDetails = ({navigation}: NavigationProps) => {
    return (
        <Container>
            <CustomHeader
                title="NFT Details"
                onBack={() => navigation.goBack()}
            />
            <ScrollView style={s.container} contentContainerStyle={s.grow}>
                <Text style={s.title}>Sample title</Text>
                <Text style={s.author}>{`By Author`}</Text>
                <Image style={s.image} />
                <Text style={s.descripton}>
                    Digital Render. Berlin. 2020 September 9
                </Text>
                <Text style={s.section}>Token</Text>
                <Text style={s.details}>OBJKT 42371</Text>
                <Text style={s.section}>Collected for</Text>
                <Text style={s.details}>1 tez</Text>
                <Text style={s.section}>Collected on</Text>
                <Text style={s.details}>June 14, 2021</Text>
                <Text style={s.link}>View on Hic Et Nunc</Text>
                <View style={[s.row, s.buttons]}>
                    <Button style={[s.btn, s.grey]}>
                        <Text>Send NFT</Text>
                    </Button>
                    <Button style={[s.btn, s.white]}>
                        <Text style={s.share}>Share</Text>
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
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        letterSpacing: -0.3,
        marginTop: 25,
    },
    author: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 3,
    },
    image: {
        borderWidth: 1,
        height: 228,
        marginTop: 8,
    },
    descripton: {
        fontSize: 16,
        letterSpacing: -0.3,
        marginTop: 16,
    },
    section: {
        fontSize: 12,
        fontWeight: '500',
        color: '#909090',
        marginTop: 18,
    },
    details: {
        fontSize: 16,
        letterSpacing: -0.3,
        color: '#4B4B4B',
        marginTop: 5,
    },
    link: {
        fontSize: 16,
        letterSpacing: -0.3,
        color: '#2900DB',
        marginTop: 26,
    },
    buttons: {
        marginTop: 54,
    },
    btn: {
        borderRadius: 25,
    },
    grey: {
        backgroundColor: '#4B4B4B',
    },
    white: {
        backgroundColor: 'rgba(75, 75, 75, 0.5)'
    },
    share: {
        color: '#000000',
        opacity: 1,
    },
});

export default NFTDetails;
