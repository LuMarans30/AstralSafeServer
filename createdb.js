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

        var license = "";

        async function main() {

            const uri = process.env.MONGODB_URI;
            const client = new MongoClient(uri, { useNewUrlParser: true });

            return client.connect().then(async () => {

                const db = client.db('licensesdb');
                const collection = db.collection('licenses');

                return collection.findOne({ uid: uid }).then((result) => {
                    if (result) {
                        console.log('License found');
                        license = result;
                    } else {
                        license = "License not found";
                    }
                });
            }
            ).catch(err => {
                console.error(err);
            }
            ).finally(() => {
                client.close();
                console.log('Connection closed');
            });
        }

        await main().catch(console.error).then(() => {
            console.log('Done');
        });

        return license;
    },
    /**
     * Insert a new element into the database
     * @returns {Promise<string>} license
     * @param {string} uid
     * @param {string} key
     * @param {string} license
    */
    insert: async function insert(uid, key, license) {

        async function main() {

            const uri = process.env.MONGODB_URI;
            const client = new MongoClient(uri, { useNewUrlParser: true });

            return client.connect().then( async () => {

                const db = client.db('licensesdb');
                const collection = db.collection('licenses');

                return collection.updateOne({ uid: uid }, { $setOnInsert: { uid: uid, key: key, license: license } }, { upsert: true })
            }
            ).catch(err => {
                console.error(err);
            }
            ).finally(() => {
                client.close();
            });
        }

        main().catch(console.error);
    }
}
