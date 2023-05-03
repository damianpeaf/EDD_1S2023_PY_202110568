export const hashPassword = async (password) => {
    const passwordBytes = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', passwordBytes);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}


const key = '202110568'
const buffer = new ArrayBuffer(16)
const view = new Uint8Array(buffer)
for (let i = 0; i < key.length; i++) {
    view[i] = key.charCodeAt(i)
}

const iv = new Uint8Array(16)
const algorithm = { name: 'AES-GCM', iv: iv }

export async function aesEncryption(msg) {
    const enconder = new TextEncoder()
    const data = enconder.encode(msg)

    const crytoKey = await crypto.subtle.importKey('raw', view, 'AES-GCM', true, ['encrypt'])

    const encryptedMsg = await crypto.subtle.encrypt(algorithm, crytoKey, data)

    const base64Encrypt = btoa(String.fromCharCode.apply(null, new Uint8Array(encryptedMsg)))

    return base64Encrypt;
}

export async function aesDecryption(msg) {
    const encryptedMsg = new Uint8Array(atob(msg).split('').map(char => char.charCodeAt(0)))

    const cryptoKey = await crypto.subtle.importKey('raw', view, 'AES-GCM', true, ['decrypt'])

    const decryptedMsg = await crypto.subtle.decrypt(algorithm, cryptoKey, encryptedMsg)

    const decoder = new TextDecoder()
    const originalMsg = decoder.decode(decryptedMsg)

    return originalMsg

}
