import {Buffer} from 'buffer';
const wrapper = require('./Wrapper');

export async function generateKeys(seed) {
    const k = await wrapper.keys(seed);
    return {
        privateKey: Buffer.from(k.sk, 'base64'),
        publicKey: Buffer.from(k.pk, 'base64'),
    };
}
