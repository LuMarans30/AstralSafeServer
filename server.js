import express, { json as _json, urlencoded  } from 'express';
import { encrypt } from './crypt-decrypt.js';
import { authtoken, connect } from 'ngrok';
import { getRandomHexOctets } from 'qrand';

import dotenv from 'dotenv';

dotenv.config();

import { insert, getUID } from './createdb.js';

const app = express();

app.use(_json());
app.use(urlencoded({ extended: true }));

app.use(express.static('./'));

const PORT = 8080;

app.get('/', (req, res) => {

  console.log('GET /');

  res.sendFile('index.html', { root: './' });
});

let key = "";

let license = "";

app.post('/api/keygen', (req, res) => {

  //set headers to allow cross origin request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  console.log('POST /api/keygen from IP: ' + req.socket.remoteAddress);

  let uid = req.body.uid;

  getRandomHexOctets(16, function (err, octets) {
    key = octets.join('').split(/(.{4})/).filter(Boolean);
    console.log(key);

    getRandomHexOctets(4, function (err, octets) {

      console.log(octets);

      license = octets;

      encrypt(license, key).then(function (result) {
        license = result;

        license = license.join('');
        key = key.join('');

        insert(uid, key, license).then(function (result) {
          console.log(result);

          getUID(uid).then(function (result) {
            if (result == "License not found") {
              res.send({ key, license });
            } else {
              res.send({ key: result.key, license: result.license })
            }
          });
        });
      });
    });
  });
});

app.post('/api/validate-license', (req, res) => {

  console.log('POST /api/validate-license from IP: ' + req.socket.remoteAddress);

  let json = req.body;

  let uid = json.uid;
  let license = json.license;

  //set headers to allow cross origin request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  let dblicense = "";

  getUID(uid).then(function (result) {

    dblicense = result;

    if (dblicense.license == license) {
      res.send({ key: dblicense.key });
    } else {
      res.send({ valid: false });
    }
  });

});

app.listen(PORT, '0.0.0.0');

(async function () {

  authtoken(process.env.NGROK_AUTHTOKEN);

  const url = await connect(PORT);

  console.log("\nAccess the website and API from everywhere at the following URL: " + url);
})();

console.log(`Server running on localhost:${PORT}`);