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

        var jsonData = "";

        function main() {

            const uri = process.env.MONGODB_URI;
            const client = new MongoClient(uri, { useNewUrlParser: true });

            return client.connect().then(() => {

                const db = client.db('licensesdb');
                const collection = db.collection('licenses');

                return collection.findOne({ uid: uid }).then((result) => {
                    if (result) {
                        console.log('License found');
                        jsonData = result;
                    } else {
                        jsonData = "License not found";
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

        return jsonData;
    },
    /**
     * Insert a new element into the database
     * @returns {Promise<string>} license
     * @param {string} uid
     * @param {string} key
     * @param {string} license
    */
    insert: function insert(uid, key, license) {

        function main() {

            const uri = process.env.MONGODB_URI;
            const client = new MongoClient(uri, { useNewUrlParser: true });

            client.connect().then(() => {

                const db = client.db('licensesdb');
                const collection = db.collection('licenses');

                collection.insertOne({ uid: uid, key: key, license: license }).then(() => {
                    console.log('Inserted');
                }
                ).catch(err => {
                    console.error(err);
                }
                ).finally(() => {
                    client.close();
                    console.log('Connection closed');
                });
            });
        }

        main();
    }
}
