import {GetNFTCollection} from './types';

export const GET_NFT_COLLECTION = 'GET_NFT_COLLECTION';

export const getNFTCollection = (collection: any = []): GetNFTCollection => ({
    type: GET_NFT_COLLECTION,
    collection,
});
