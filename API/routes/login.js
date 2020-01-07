var express = require('express');
var login = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/config');

login.post('/login', (req, res) => {
    console.log("[Login]: Generating token...");
    jwt.sign({}, config.jwt.privateKey, { algorithm: 'HS256' }, { expiresIn: '24h' }, (err, token) => {
        if (err) throw err;
        res.json({"status": "success", "token": token});
        console.log("[Login]: Generation success.");
    });
})

module.exports = login;