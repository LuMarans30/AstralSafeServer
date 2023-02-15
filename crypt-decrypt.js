var AES = require('aes');

module.exports = {
    /**
     * Encrypt a message using a key using the AES algorithm
     * @returns {string} ciphertext
     * @param {string} plaintext
     * @param {string} key
     */
    encrypt: function encrypt(license, key) {

        return new AES(key).encrypt(license);
    },
    /**
     * Decrypt a message using a key using the AES algorithm
     * @returns {string} plaintext
     * @param {string} ciphertext
     * @param {string} key
     */
    decrypt: function decrypt(ciphertext, key) {

        return new AES(key).decrypt(ciphertext);
    }
}