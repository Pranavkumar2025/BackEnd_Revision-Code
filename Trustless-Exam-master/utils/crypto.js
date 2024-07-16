
// utils/crypto.js

import crypto from 'crypto';

// Use fixed key and iv for testing purposes (replace with your fixed values)
//const key =  crypto.randomBytes(32)
//const iv = crypto.randomBytes(16)


/*
const key =  "<Buffer e7 ae a0 70 17 e2 ac 48 d0 c4 b3 35 7f c7 23 24 84 07 0b cd b3 9a 68 f2 b3 af 5c c1 64 86 cf 37>"
const iv = "<Buffer f5 bf 1d 0d 47 6d 0f fc 59 67 35 a4 3c 7a 0b d9>"
*/
const key = Buffer.from([0xe7, 0xae, 0xa0, 0x70, 0x17, 0xe2, 0xac, 0x48, 0xd0, 0xc4, 0xb3, 0x35, 0x7f, 0xc7, 0x23, 0x24, 0x84, 0x07, 0x0b, 0xcd, 0xb3, 0x9a, 0x68, 0xf2, 0xb3, 0xaf, 0x5c, 0xc1, 0x64, 0x86, 0xcf, 0x37]);
const iv = Buffer.from([0xf5, 0xbf, 0x1d, 0x0d, 0x47, 0x6d, 0x0f, 0xfc, 0x59, 0x67, 0x35, 0xa4, 0x3c, 0x7a, 0x0b, 0xd9]);

function encrypt(text, key, iv) {
    const algorithm = 'aes-256-cbc';
    const cipher = crypto.createCipheriv(algorithm, key, iv);
  
    // Ensure text is a string before encryption
    const inputEncoding = 'utf8';
    const outputEncoding = 'hex';

    let encrypted = cipher.update(text, inputEncoding, outputEncoding); 
    encrypted += cipher.final(outputEncoding);   
    return encrypted; 
}

function decrypt(encrypted, key, iv) {
    const algorithm = 'aes-256-cbc';
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    
    // Ensure encrypted data is in hex format for decryption
    const inputEncoding = 'hex';
    const outputEncoding = 'utf8';

    let decrypted = decipher.update(encrypted, inputEncoding, outputEncoding);
    decrypted += decipher.final(outputEncoding);
    return decrypted;
}

export { encrypt, decrypt, key, iv };

