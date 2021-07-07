import {SET_NFT_COLLECTION, SET_NFT_COLLECTION_LOADING} from './actions';
import {NFTState, NFTActions} from './types';

const initialState = {
    collection: [],
    collectionLoading: false,
};

const nft = (state: NFTState = initialState, action: NFTActions) => {
    switch (action.type) {
        case SET_NFT_COLLECTION:
            return {...state, collection: action.collection};
        case SET_NFT_COLLECTION_LOADING:
            return {...state, collectionLoading: action.collectionLoading};
        default:
            return state;
    }
};

export default nft;
