var express = require('express');
var aes = require('./crypt-decrypt.js');
const ngrok = require('ngrok');
let keygen = require('qrand');

require('dotenv').config();

var db = require('./createdb.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

  keygen.getRandomHexOctets(16, function (err, octets) {
    key = octets.join('').split(/(.{4})/).filter(Boolean);
    console.log(key);

    keygen.getRandomHexOctets(4, function (err, octets) {

      console.log(octets);

      license = octets;

      aes.encrypt(license, key).then(function (result) {
        license = result;

        license = license.join('');
        key = key.join('');

        db.insert(uid, key, license).then(function (result) {
          console.log(result);

          db.getUID(uid).then(function (result) {
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

  db.getUID(uid).then(function (result) {

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

  ngrok.authtoken(process.env.NGROK_AUTHTOKEN);

  const url = await ngrok.connect(PORT);

  console.log("\nAccess the website and API from everywhere at the following URL: " + url);
})();

console.log(`Server running on localhost:${PORT}`);