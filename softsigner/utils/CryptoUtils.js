const wrapper = require('./Wrapper');

export async function generateKeys(seed) {
    const k = await wrapper.keys(seed);
    return {privateKey: k.sk, publicKey: k.pk};
}
