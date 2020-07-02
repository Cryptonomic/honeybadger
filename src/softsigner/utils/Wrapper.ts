import sodium from 'react-native-sodium';
import {Buffer} from 'buffer';

export const keys = async (seed: Buffer) => {
    return await sodium.crypto_sign_seed_keypair(seed.toString('base64'));
};

export const sign = async (message: Buffer, key: Buffer) => {
    return await sodium.crypto_sign_detached(
        message.toString('base64'),
        key.toString('base64'),
    );
};

export const publickey = async (sk: Buffer) => {
    const seed = await sodium.crypto_sign_ed25519_sk_to_seed(
        sk.toString('base64'),
    );
    return await sodium.crypto_sign_seed_keypair(seed);
};
