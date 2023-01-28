module.exports = {
    /**
     * Get a random key from the ANU Quantum Random String Generator
     * @returns {Promise<string>} A random key
     */
    generateKey: async function generateKey() 
    {
        var response = await fetch("https://qrng.anu.edu.au/wp-content/plugins/colours-plugin/get_block_alpha.php");
    
        var data = await response.text();
    
        return data;
    }
}
