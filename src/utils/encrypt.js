export function getEncrypt(dataToEncrypt) {
    var plainText = JSON.stringify(dataToEncrypt);

    // AES 密钥（16、24 或 32 字节的字符串）
    var key = CryptoJS.enc.Utf8.parse('dkHXhJOuNEDKI3bo1pGYHlwByExn9cqM');

    // 随机生成的16字节初始化向量 (IV)
    var iv = CryptoJS.lib.WordArray.random(16);

    // 执行加密
    var encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // 最终的加密结果
    var encryptedData = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
    return encryptedData
}
export function getDecrypted(encryptedData) {
    var key = CryptoJS.enc.Utf8.parse('dkHXhJOuNEDKI3bo1pGYHlwByExn9cqM');

    // 已加密的数据（Base64 编码）
    var encryptedData = encryptedData

    // 将Base64编码的字符串解码为字节
    var bytes = CryptoJS.enc.Base64.parse(encryptedData);

    // 将IV（前16字节）和密文分开
    var iv = CryptoJS.lib.WordArray.create(bytes.words.slice(0, 4));
    var cipherText = CryptoJS.lib.WordArray.create(bytes.words.slice(4));

    // 解密
    var decrypted = CryptoJS.AES.decrypt(
        { ciphertext: cipherText },
        key,
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    // 将解密后的数据转换为UTF-8字符串
    var decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedText
}