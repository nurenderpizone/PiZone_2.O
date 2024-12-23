const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('private.key', 'utf8');

const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 15)
};

const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
console.log('Bearer', token);