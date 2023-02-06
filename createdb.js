import { MongoClient } from 'mongodb';

import dotenv from 'dotenv';

dotenv.config();

/**
 * Get a license by UID
 * @returns {Promise<string>} license
 * @param {string} uid
*/
export function getUID(uid) {

    var license = "";

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect().then(async () => {

        const db = client.db('licensesdb');
        const collection = db.collection('licenses');

        collection.findOne({ uid: uid }).then((result) => {
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
        return license;
    });
};

/**
 * Insert a new element into the database
 * @returns {Promise<string>} license
 * @param {string} uid
 * @param {string} key
 * @param {string} license
*/
export async function insert(uid, key, license) {

    async function main() {

        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri, { useNewUrlParser: true });

        return client.connect().then(async () => {

            const db = client.db('licensesdb');
            const collection = db.collection('licenses');

            return collection.updateOne({ uid: uid }, { $setOnInsert: { uid: uid, key: key, license: license } }, { upsert: true });
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
