import {GET_NFT_COLLECTION} from './actions';
import {NFTState, NFTActions} from './types';

const initialState = {
    collection: [],
};

const nft = (state: NFTState = initialState, action: NFTActions) => {
    switch (action.type) {
        case GET_NFT_COLLECTION:
            return {...state, collection: action.collection};
        default:
            return state;
    }
};

export default nft;
