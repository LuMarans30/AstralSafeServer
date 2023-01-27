var express = require('express');
var keygen = require('./keygen.js');
let pad = require("one-time-pad");

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8080;

app.get('/', (req, res) => {

  console.log('GET /');

  res.send('SEND POST REQUEST TO /api/encrypt TO ENCRYPT AND /api/decrypt TO DECRYPT');
});

let key = "";

app.post('/api/encrypt', (req, res) => {

  console.log('POST /api/encrypt');

  let plaintext = req.body;

  let encrypted = "";

  keygen.generateKey().then(function (result) {

    //Remove spaces from string

    plaintext.plaintext = plaintext.plaintext.replace(/\s/g, "");

    //Substring the key to the length of the plaintext

    result = result.substring(0, plaintext.plaintext.length);

    encrypted = pad.encrypt(plaintext.plaintext, result);

    key = result;

    res.send({ key: key, encrypted: encrypted });
  });
});

app.post('/api/decrypt', (req, res) => {

  console.log('POST /api/decrypt');

  let encrypt = req.body;

  let plaintext = "";

  plaintext = pad.decrypt(encrypt.ciphertext, key);

  res.send({ key: key, plaintext: plaintext });
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});