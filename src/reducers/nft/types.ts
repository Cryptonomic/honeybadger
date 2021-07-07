import {SET_NFT_COLLECTION, SET_NFT_COLLECTION_LOADING} from './actions';

export interface NFTState {
    collection: any;
    collectionLoading: boolean;
}

export interface SetNFTCollection {
    type: typeof SET_NFT_COLLECTION;
    collection: any;
}

export interface SetNFTCollectionLoading {
    type: typeof SET_NFT_COLLECTION_LOADING;
    collectionLoading: boolean;
}

export type NFTActions = SetNFTCollection | SetNFTCollectionLoading;
