import * as React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Linking} from 'react-native';
import {Container, View, Text, Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import CustomHeader from '../components/CustomHeader';
import NFTStandardView from '../components/NFTStandardView';
import NFTTileView from '../components/NFTTileView';

import {NavigationProps} from '../screens/types';
import {State} from '../reducers/types';

import {
    setNFTCollectionLoading,
    setNFTCollection,
    setNFTSelected,
    setNFTGalleryView,
} from '../reducers/nft/actions';
import {getNFTCollection, getNFTObjectDetails} from '../reducers/nft/thunks';

import config from '../config';

import RowsViewIcon from '../../assets/rows-view.svg';
import TilesViewIcon from '../../assets/tiles-view.svg';

const NFTGallery = ({navigation}: NavigationProps) => {
    const dispatch = useDispatch();
    const {collectionLoading, collection, galleryView} = useSelector(
        (state: State) => state.nft,
    );

    const [tab, setTab] = useState(0);

    const changeTab = (newTab: number) => {
        if (newTab === tab) {
            return;
        }
        setTab(newTab);
    };

    const onPressUnsupported = (id: string) =>
        Linking.openURL(`https://www.hicetnunc.xyz/objkt/${id}`);

    const onSelect = (item: any) => {
        dispatch(setNFTSelected(item));
        navigation.navigate('NFTDetails');
    };

    useEffect(() => {
        const updateGallery = async () => {
            dispatch(setNFTCollectionLoading(true));
            const newCollection: any = await getNFTCollection(
                511,
                'tz1djRgXXWWJiY1rpMECCxr5d9ZBqWewuiU1',
                {
                    apiKey: config[0].apiKey,
                    network: config[0].network,
                    conseilUrl: config[0].url,
                },
            );
            for (let item of newCollection) {
                const itemDetails = await getNFTObjectDetails(
                    config[0].nodeUrl,
                    Number(item.piece),
                );
                item.details = itemDetails;
            }

            dispatch(setNFTCollection(newCollection));
            dispatch(setNFTCollectionLoading());
        };
        updateGallery();
    }, [dispatch]);

    return (
        <Container>
            <CustomHeader
                title="NFT Gallery"
                onBack={() => navigation.goBack()}
                RightComponent={
                    <RightCustomComponent
                        onPress={() =>
                            dispatch(
                                setNFTGalleryView(galleryView === 1 ? 0 : 1),
                            )
                        }
                        isTiles={!galleryView}
                    />
                }
            />
            <View style={s.tabs}>
                <View
                    style={[
                        s.tab,
                        tab === 0 ? s.tabBorderActive : s.tabBorderInactive,
                    ]}>
                    <Button
                        style={s.tabBtn}
                        transparent
                        onPress={() => changeTab(0)}>
                        <Text
                            style={[
                                s.tabTypo,
                                tab === 0 ? s.tabActive : s.tabInactive,
                            ]}>
                            Collected
                        </Text>
                    </Button>
                </View>
                <View
                    style={[
                        s.tab,
                        tab === 1 ? s.tabBorderActive : s.tabBorderInactive,
                    ]}>
                    <Button
                        style={s.tabBtn}
                        transparent
                        onPress={() => changeTab(1)}>
                        <Text
                            style={[
                                s.tabTypo,
                                tab === 1 ? s.tabActive : s.tabInactive,
                            ]}>
                            Minted
                        </Text>
                    </Button>
                </View>
            </View>
            <ScrollView
                style={s.tabContainer}
                contentContainerStyle={
                    galleryView === 0 ? s.grow : [s.grow, s.row]
                }>
                {collectionLoading && <Text style={s.loading}>Loading...</Text>}
                {!collectionLoading &&
                    tab === 0 &&
                    collection.map((item: any, index: number) =>
                        galleryView === 0 ? (
                            <NFTStandardView
                                item={item}
                                openLink={onPressUnsupported}
                                onSelect={onSelect}
                                index={index}
                                key={index}
                            />
                        ) : (
                            <NFTTileView
                                item={item}
                                openLink={onPressUnsupported}
                                onSelect={onSelect}
                                index={index}
                                key={index}
                            />
                        ),
                    )}
                {!collectionLoading && tab === 1 && <Text>tab2</Text>}
            </ScrollView>
        </Container>
    );
};

const s = StyleSheet.create({
    tabs: {
        marginTop: 5,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    tab: {
        borderBottomWidth: 3,
        borderRadius: 0,
        width: '50%',
        justifyContent: 'center',
    },
    tabBtn: {
        alignSelf: 'center',
    },
    tabContainer: {
        width: '100%',
        paddingHorizontal: 16,
    },
    tabActive: {
        color: 'rgba(0, 0, 0, 0.92)',
    },
    tabInactive: {
        color: 'rgb(125, 124, 124)',
    },
    tabBorderActive: {
        borderBottomColor: '#f1c20e',
    },
    tabBorderInactive: {
        borderBottomColor: '#e8e8e8',
    },
    tabTypo: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 27,
        textTransform: 'capitalize',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    grow: {
        flexGrow: 1,
    },
    loading: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '100%',
        marginTop: 100,
    },
});

function RightCustomComponent({
    onPress,
    isTiles,
}: {
    onPress: () => void;
    isTiles: boolean;
}) {
    return (
        <Button transparent onPress={onPress}>
            {isTiles && <TilesViewIcon />}
            {!isTiles && <RowsViewIcon />}
        </Button>
    );
}

export default NFTGallery;
