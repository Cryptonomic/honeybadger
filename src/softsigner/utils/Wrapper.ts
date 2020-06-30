import sodium from 'react-native-sodium';

export const keys = async (seed) => {
    return await sodium.crypto_sign_seed_keypair(seed.toString('base64'));
};

export const sign = async (message, key) => {
    return await sodium.crypto_sign_detached(message, key);
};

export const publickey = async (sk) => {
    const seed = await sodium.crypto_sign_ed25519_sk_to_seed(
        sk.toString('base64'),
    );
    return await sodium.crypto_sign_seed_keypair(seed);
};
