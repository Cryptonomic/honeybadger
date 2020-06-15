import {
    KeyStore,
    KeyStoreCurve,
    KeyStoreType,
    TezosMessageUtils,
} from 'conseiljs';

import * as bip39 from 'bip39';
import * as CryptoUtils from './utils/CryptoUtils';

export async function generateIdentity(
    strength = 256,
    password = '',
    mnemonic,
) {
    try {
        return restoreIdentityFromMnemonic(
            mnemonic || bip39.generateMnemonic(strength),
            password,
        );
    } catch (e) {
        console.log('[ERROR]', e);
    }
}

export async function generateKeys(seed) {
    const keys = await CryptoUtils.generateKeys(seed);
    return {publicKey: keys.publicKey, secretKey: keys.privateKey};
}

export async function restoreIdentityFromMnemonic(
    mnemonic,
    password,
    pkh,
    derivationPath,
) {
    try {
        if (![12, 15, 18, 21, 24].includes(mnemonic.split(' ').length)) {
            throw new Error('Invalid mnemonic length.');
        }
        if (!bip39.validateMnemonic(mnemonic)) {
            throw new Error('The given mnemonic could not be validated.');
        }

        const seed = (await bip39.mnemonicToSeed(mnemonic, password)).slice(
            0,
            32,
        );
        const keys = await generateKeys(seed);

        //TODO: Error: Incorrect hex length, 90 to parse a key

        // const secretKey = TezosMessageUtils.readKeyWithHint(
        //     keys.secretKey,
        //     'edsk',
        // );
        // const publicKey = TezosMessageUtils.readKeyWithHint(
        //     keys.publicKey,
        //     'edpk',
        // );
        // const publicKeyHash = TezosMessageUtils.computeKeyHash(
        //     keys.publicKey,
        //     'tz1',
        // );

        // if (!!pkh && publicKeyHash !== pkh) {
        //     throw new Error(
        //         'The given mnemonic and passphrase do not correspond to the supplied public key hash',
        //     );
        // }

        return {
            publicKey: keys.publicKey,
            secretKey: keys.secretKey,
            // publicKeyHash,
            curve: KeyStoreCurve.ED25519,
            storeType: KeyStoreType.Mnemonic,
            seed: mnemonic,
            derivationPath,
        };
    } catch (e) {
        console.log('[ERROR]', e);
    }
}
