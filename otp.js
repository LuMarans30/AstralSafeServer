module.exports = {
    /**
     * Encrypt a message using a key using the OTP algorithm
     * @returns {Promise<string>} ciphertext
     * @param {string} plaintext
     * @param {string} key
     */
    encrypt: async function encrypt(plaintext, key) {
        var ciphertext = "";

        var alphabet = "abcdefghijklmnopqrstuvwxyz";

        var obj = prepareMsgKey(plaintext, key);

        var plaintext = obj.msg;

        var key = obj.key;

        for(i=0; i < plaintext.length; i++) {

            var plaintextIndex = alphabet.indexOf(plaintext[i]);

            var keyIndex = alphabet.indexOf(key[i]);

            var ciphertextIndex = (plaintextIndex + keyIndex) % 26;

            ciphertext += alphabet[ciphertextIndex];
        }

        return { ciphertext: ciphertext, key: key};
    },
    /**
     * Decrypt a message using a key using the OTP algorithm
     * @returns {Promise<string>} plaintext
     * @param {string} ciphertext
     * @param {string} key
     */
    decrypt: async function decrypt(ciphertext, key) {
        var plaintext = "";

        var alphabet = "abcdefghijklmnopqrstuvwxyz";

        var obj = prepareMsgKey(ciphertext, key);

        var ciphertext = obj.msg;

        var key = obj.key;

        for(i=0; i < ciphertext.length; i++) {

            var ciphertextIndex = alphabet.indexOf(ciphertext[i]);

            var keyIndex = alphabet.indexOf(key[i]);

            var plaintextIndex = (ciphertextIndex - keyIndex + 26) % 26;

            plaintext += alphabet[plaintextIndex];
        }

        return plaintext;
    }
}

function prepareMsgKey(msg, key) {

    //Remove all digits, special characters and spaces from the message

    msg = msg.replace(/[^a-zA-Z]/g, "");

    //Remove all digits, special characters and spaces from the key

    key = key.replace(/[^a-zA-Z]/g, "");

    //message to lowercase

    msg = msg.toLowerCase();

    //Substring the key to the length of the message

    key = key.substring(0, msg.length);

    //key to lowercase

    key = key.toLowerCase();

    return { msg: msg, key: key };
}