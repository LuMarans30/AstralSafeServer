var express = require('express');
var keygen = require('./keygen.js');
var pad = require('./otp.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));


const PORT = 8080;

app.get('/', (req, res) => {

  console.log('GET /');

  res.sendFile('index.html', { root: './' });
});

let key = "";

app.post('/api/encrypt', (req, res) => {

  console.log('POST /api/encrypt from IP: ' + req.socket.remoteAddress);

  let plaintext = req.body;

  let encrypted = "";

  keygen.generateKey().then(function (result) {

    key = result;

    pad.encrypt(plaintext.plaintext, result).then(function (result) {

      encrypted = result.ciphertext;

      key = result.key;

      //set headers to allow cross origin request
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);

      res.send({encrypted: encrypted});
    });
  });
});

app.post('/api/decrypt', (req, res) => {

  console.log('POST /api/decrypt from IP: ' + req.socket.remoteAddress);

  let encrypted = req.body;

  let plaintext = "";

  pad.decrypt(encrypted.ciphertext, key).then(function (result) {
    plaintext = result;

    //set headers to allow cross origin request
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.send({plaintext: plaintext});
  });
});

app.get('/api/key', (req, res) => {

  console.log('GET /api/key');

  var exampleKey = "";

  keygen.generateKey().then(function (result) {

    exampleKey = result;

    res.send({ key: exampleKey });

  });

});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});