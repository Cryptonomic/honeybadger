import {SetNFTCollection, SetNFTCollectionLoading} from './types';

export const SET_NFT_COLLECTION = 'GET_NFT_COLLECTION';
export const SET_NFT_COLLECTION_LOADING = 'SET_NFT_COLLECTION_LOADING';

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
