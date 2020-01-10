var jwt = require('jsonwebtoken');
var config = require('../config/config');

const postLogin = (req, res) => {
    console.log("[Login]: Generating token...");
    jwt.sign({}, config.jwt.privateKey, { algorithm: 'HS256' }, (err, token) => {
        if (err) throw err;
        res.json({"status": "success", "account": {token: token}});
        console.log("[Login]: Generation success.");
    });
}

module.exports = {
    post: postLogin,
}