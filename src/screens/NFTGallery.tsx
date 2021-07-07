import * as React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Container, View, Text, Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import CustomHeader from '../components/CustomHeader';
import NFTStandardView from '../components/NFTStandardView';
import NFTTileView from '../components/NFTTileView';

import {NavigationProps} from '../screens/types';
import {State} from '../reducers/types';

import {getNFTCollection} from '../reducers/nft/thunks';

const items = [1, 2, 3];

const nodeTest = {
    displayName: 'Tezos Mainnet (nautilus.cloud)',
    platform: 'tezos',
    network: 'mainnet',
    tezosUrl: 'https://tezos-prod.cryptonomic-infra.tech:443',
    conseilUrl: 'https://conseil-prod.cryptonomic-infra.tech:443',
    apiKey: 'galleon',
};

const NFTGallery = ({navigation}: NavigationProps) => {
    const dispatch = useDispatch();
    const {collectionLoading, collection} = useSelector(
        (state: State) => state.nft,
    );

    const [tab, setTab] = useState(0);
    const [view, setView] = useState(0);

    const changeTab = (newTab: number) => {
        if (newTab === tab) {
            return;
        }
        setTab(newTab);
    };

    useEffect(() => {
        dispatch(
            getNFTCollection(
                511,
                'tz1djRgXXWWJiY1rpMECCxr5d9ZBqWewuiU1',
                nodeTest,
            ),
        );
    }, [dispatch]);

    return (
        <Container>
            <CustomHeader
                title="NFT Gallery"
                onBack={() => navigation.goBack()}
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
                contentContainerStyle={view === 0 ? s.grow : [s.grow, s.row]}>
                {collectionLoading && <Text>Loading...</Text>}
                {!collectionLoading &&
                    tab === 0 &&
                    items.map((item, index) =>
                        view === 0 ? (
                            <NFTStandardView
                                item={{}}
                                index={index}
                                key={index}
                            />
                        ) : (
                            <NFTTileView item={{}} index={index} key={index} />
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
});

export default NFTGallery;
