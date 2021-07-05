import * as React from 'react';
import {View} from 'native-base';
import {StyleSheet, Image} from 'react-native';

const NFTTileView = ({item, index}: {item: any; index: number}) => {
    return (
        <View style={index === 0 || index === 1 ? [s.item, s.first] : s.item}>
            <Image style={s.inner} />
        </View>
    );
};

const s = StyleSheet.create({
    item: {
        width: '50%',
        height: 200,
        padding: 6,
    },
    inner: {
        borderWidth: 1,
        width: '100%',
        height: '100%',
    },
    first: {
        marginTop: 24,
    },
});

export default NFTTileView;
