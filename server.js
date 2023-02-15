var express = require('express');
const cors = require('cors');
var aes = require('./crypt-decrypt.js');
var db = require('./createdb.js');
const ngrok = require('ngrok');
let qrand = require('qrand');

require('dotenv').config();

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./'));
app.use(cors());

app.get('/docs', (req, res) => {

  console.log('GET /docs');

  res.sendFile('docs.html', { root: './dist' });
});

app.get('/', (req, res) => {

  console.log('GET /');

  res.sendFile('index.html', { root: './web' });
});

function getRandomHexOctets(n) {
  return new Promise(function (resolve, reject) {
    qrand.getRandomHexOctets(n, function (err, octets) {
      if (err) {
        reject(err);
      } else {
        resolve(octets);
      }
    });
  });
}

app.post('/api/keygen', async (req, res) => {

  try {

    console.log('POST /api/keygen from IP: ' + req.socket.remoteAddress);

    const uid = req.body.uid;
    let encryptedLicense = null;
    let key = null;

    await getRandomHexOctets(16).then(async (octets16) => {
      key = octets16.join('').split(/(.{4})/).filter(Boolean)

      await getRandomHexOctets(4).then((octets4) => {
        const license = octets4
        encryptedLicense = aes.encrypt(license, key)
      });
    });

    const result = await db.getUID(uid);

    if (result === 'License not found') {

      await db.insert(uid, key.join(''), encryptedLicense.join(''));
      res.send({ key: key.join(''), license: encryptedLicense.join('') });

    } else {
      res.send({ key: result.key, license: result.license });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }

});

app.post('/api/validate-license', async (req, res) => {

  try {

    console.log('POST /api/validate-license from IP: ' + req.socket.remoteAddress);
    const { uid, license } = req.body;
    const dblicense = await db.getUID(uid);

    if (dblicense.license === license) {

      res.send({ key: dblicense.key });

    } else {
      res.send({ valid: false });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }

});

app.listen(PORT, '0.0.0.0');

/*(async function () {

  ngrok.authtoken(process.env.NGROK_AUTHTOKEN);

  const url = await ngrok.connect(PORT);

  console.log("\nAccess the website and API from everywhere at the following URL: " + url);
})();*/

console.log(`Server running on localhost:${PORT}`);
