import {
    SET_NFT_COLLECTION,
    SET_NFT_COLLECTION_LOADING,
    SET_NFT_SELECTED,
    SET_NFT_GALLERY_VIEW,
} from './actions';

export interface NFTState {
    collection: any;
    collectionLoading: boolean;
    selected: any;
    galleryView: number;
}

export interface SetNFTGalleryView {
    type: typeof SET_NFT_GALLERY_VIEW;
    galleryView: number;
}

export interface SetNFTCollection {
    type: typeof SET_NFT_COLLECTION;
    collection: any;
}

export interface SetNFTCollectionLoading {
    type: typeof SET_NFT_COLLECTION_LOADING;
    collectionLoading: boolean;
}

export interface SetNFTSelected {
    type: typeof SET_NFT_SELECTED;
    selected: any;
}

export type NFTActions =
    | SetNFTCollection
    | SetNFTCollectionLoading
    | SetNFTSelected
    | SetNFTGalleryView;
