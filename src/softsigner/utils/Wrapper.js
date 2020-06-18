import sodium from 'react-native-sodium';

export const keys = async seed => {
    return await sodium.crypto_sign_seed_keypair(seed.toString('base64'));
};
