import {
    SetNFTCollection,
    SetNFTCollectionLoading,
    SetNFTSelected,
} from './types';

export const SET_NFT_COLLECTION = 'GET_NFT_COLLECTION';
export const SET_NFT_COLLECTION_LOADING = 'SET_NFT_COLLECTION_LOADING';
export const SET_NFT_SELECTED = 'SET_NFT_SELECTED';

export const setNFTCollection = (collection: any = []): SetNFTCollection => ({
    type: SET_NFT_COLLECTION,
    collection,
});

export const setNFTCollectionLoading = (
    collectionLoading: boolean = false,
): SetNFTCollectionLoading => ({
    type: SET_NFT_COLLECTION_LOADING,
    collectionLoading,
});

export const setNFTSelected = (selected: any = null): SetNFTSelected => ({
    type: SET_NFT_SELECTED,
    selected,
});
