module.exports = {
    /**
     * Get a random key from the ANU Quantum Random Number Generator
     * @returns {Promise<string>} A random key
     */
    generateKey: async function generateKey() 
    {
        var response = await fetch("https://qrng.anu.edu.au/wp-content/plugins/colours-plugin/get_block_alpha.php");
    
        var data = await response.text();

        //Remove all digits and special characters

        data = data.replace(/[^a-zA-Z]/g, "");
    
        return data;
    }
}