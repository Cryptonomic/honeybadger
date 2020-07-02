import * as wrapper from './Wrapper';
import {Buffer} from 'buffer';

export async function generateKeys(seed: Buffer) {
    const k = await wrapper.keys(seed);
    return {
        privateKey: Buffer.from(k.sk, 'base64'),
        publicKey: Buffer.from(k.pk, 'base64'),
    };
}

export async function signDetached(
    payload: Buffer,
    secretKey: Buffer,
): Promise<Buffer> {
    const b = Buffer.from(await wrapper.sign(payload, secretKey), 'base64');
    return Buffer.from(b);
}

export async function recoverPublicKey(secretKey: Buffer) {
    const k = await wrapper.publickey(secretKey);
    return {
        privateKey: Buffer.from(k.sk, 'base64'),
        publicKey: Buffer.from(k.pk, 'base64'),
    };
}
