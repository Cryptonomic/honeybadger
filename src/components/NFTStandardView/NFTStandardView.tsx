import * as React from 'react';
import {View, Text} from 'native-base';
import {Image, StyleSheet} from 'react-native';

import banner from '../../../assets/banner.png';

const bannerUri = Image.resolveAssetSource(banner).uri;
const sample = 'tz1fde…14Mibn';

const NFTStandardView = ({item, index}: {item: any; index: number}) => {
    return (
        <View style={index === 0 ? [s.item, s.first] : s.item}>
            <Image style={s.image} source={{uri: bannerUri}} />
            <View style={s.description}>
                <Text style={s.title}>Title</Text>
                <Text style={s.address}>{`By ${sample}`}</Text>
            </View>
        </View>
    );
};

const s = StyleSheet.create({
    item: {
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginTop: 16,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10,
    },
    image: {
        width: '100%',
        height: 208,
        borderRadius: 8,
    },
    description: {
        width: '100%',
        height: 48,
        padding: 8,
    },
    first: {
        marginTop: 24,
    },
    title: {
        fontWeight: '500',
        fontSize: 12,
    },
    address: {
        fontSize: 12,
        color: '#4B4B4B',
    },
});

export default NFTStandardView;
