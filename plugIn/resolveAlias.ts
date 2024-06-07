export const webcrypto = (size: any) => {
    let bytes = new Uint8Array(size);
    window.crypto.getRandomValues(bytes);
    return bytes;
};