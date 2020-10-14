import {Signer, SignerCurve, TezosMessageUtils} from 'conseiljs';

import * as CryptoUtils from './utils/CryptoUtils';
import {Buffer} from 'buffer';

export default class SoftSigner implements Signer {
    readonly secretKey: Buffer;

    constructor(secretKey: Buffer) {
        this.secretKey = secretKey;
    }

    public getSignerCurve(): SignerCurve {
        return SignerCurve.ED25519
    }

    public async signOperation(bytes: Buffer): Promise<Buffer> {
        return await CryptoUtils.signDetached(
            TezosMessageUtils.simpleHash(bytes, 32),
            this.secretKey,
        );
    }

    public async signText(message: string): Promise<string> {
        const messageSig = await CryptoUtils.signDetached(Buffer.from(message, 'utf8'), this.secretKey);

        return TezosMessageUtils.readSignatureWithHint(messageSig, 'edsig');
    }

    /**
     * * Convenience function that uses Tezos nomenclature to sign arbitrary text. This method produces a 32-byte blake2s hash prior to signing.
     * 
     * @param message UTF-8 text
     * @returns {Promise<string>} base58check-encoded signature prefixed with 'edsig'
     */
    public async signTextHash(message: string): Promise<string> {
        const messageHash = TezosMessageUtils.simpleHash(Buffer.from(message, 'utf8'), 32);
        const messageSig = await CryptoUtils.signDetached(messageHash, this.secretKey);

        return TezosMessageUtils.readSignatureWithHint(messageSig, 'edsig');
    }
}
