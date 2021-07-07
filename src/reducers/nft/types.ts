import {GET_NFT_COLLECTION} from './actions';

export interface NFTState {
    collection: any;
}

export interface GetNFTCollection {
    type: typeof GET_NFT_COLLECTION;
    collection: any;
}

export type NFTActions = GetNFTCollection;
