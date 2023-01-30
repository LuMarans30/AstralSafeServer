var AES = require('aes');

module.exports = {
    /**
     * Encrypt a message using a key using the OTP algorithm
     * @returns {Promise<string>} ciphertext
     * @param {string} plaintext
     * @param {string} key
     */
    encrypt: async function encrypt(license, key) {
        var ciphertext = "";

        var aes = new AES(key);

        ciphertext = aes.encrypt(license);

        return ciphertext;
    },
    /**
     * Decrypt a message using a key using the OTP algorithm
     * @returns {Promise<string>} plaintext
     * @param {string} ciphertext
     * @param {string} key
     */
    decrypt: async function decrypt(ciphertext, key) {
        var plaintext = "";

        var aes = new AES(key);

        plaintext = aes.decrypt(ciphertext);

        return plaintext;
    }
}