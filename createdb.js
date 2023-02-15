const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

module.exports =
{
    /**
     * Get a license by UID
     * @returns {Promise<string>} license
     * @param {string} uid
    */
    getUID: async function getByUID(uid) {

        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri, { useNewUrlParser: true });

        return client.connect().then(async () => {
            const db = client.db('licensesdb');
            const collection = db.collection('licenses');

            const result = await collection.findOne({ uid: uid });
            if (result) {
                console.log('License found');
                return result;
            } else {
                return "License not found";
            }
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            console.log('Connection closed');
            client.close();
        });
    },
    /**
     * Insert a new element into the database
     * @returns {Promise<string>} license
     * @param {string} uid
     * @param {string} key
     * @param {string} license
    */
    insert: async function insert(uid, key, license) {

        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri, { useNewUrlParser: true });

        return await client.connect().then(() => {
            const db = client.db('licensesdb');
            const collection = db.collection('licenses');

            return collection.insertOne({ uid: uid, key: key, license: license }).then(() => {
                console.log('Inserted');
            }).catch((err) => {
                console.error(err);
            }).finally(() => {
                console.log('Connection closed');
                client.close();
            });
        }).catch((err) => {
            console.error(err);
        });
    }
}
