var serpentEncrypt = function (plainText, key) {
    debugger
    var encryptedText = encrypt(plainText, key);
    return encryptedText;
}

var serpentDecrypt = function (encryptedText, key) {
    debugger
    return decrypt(encryptedText, key);
}

var encrypt = function (plainText, key) {
    var C = CryptoJS;
    plainText = C.enc.Utf8.parse(plainText);
    key = C.enc.Utf8.parse(key);
    var aes = C.algo.AES.createEncryptor(key, {
        mode: C.mode.CBC,
        padding: C.pad.Pkcs7,
        iv: key
    });
    var encrypted = aes.finalize(plainText);
    return C.enc.Base64.stringify(encrypted);
}

var decrypt = function (encryptedText, key) {
    var C = CryptoJS;
    encryptedText = C.enc.Base64.parse(encryptedText);
    key = C.enc.Utf8.parse(key);
    var aes = C.algo.AES.createDecryptor(key, {
        mode: C.mode.CBC,
        padding: C.pad.Pkcs7,
        iv: key
    });
    var decrypted = aes.finalize(encryptedText);
    return C.enc.Utf8.stringify(decrypted);
}
