import {Signer, TezosMessageUtils} from 'conseiljs';

import * as CryptoUtils from './utils/CryptoUtils';
import {Buffer} from 'buffer';

export default class SoftSigner implements Signer {
    readonly secretKey: Buffer;

    constructor(secretKey: Buffer) {
        this.secretKey = secretKey;
    }
    public async signOperation(bytes: Buffer): Promise<Buffer> {
        return await CryptoUtils.signDetached(
            TezosMessageUtils.simpleHash(bytes, 32),
            this.secretKey,
        );
    }

    public async signText(message: string): Promise<string> {
        const messageSig = await CryptoUtils.signDetached(
            Buffer.from(message, 'utf8'),
            this.secretKey,
        );

        return TezosMessageUtils.readSignatureWithHint(messageSig, 'edsig');
    }
}
