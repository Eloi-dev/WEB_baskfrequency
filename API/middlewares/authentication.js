var jwt = require('jsonwebtoken');
var config = require('../config/config');

module.exports = (req, res, next) => {
    console.log("[Dashboard middleware]: Checking authentication with: ", req.headers.authorization);
    if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        res.json({"error": "No authentication token found"});
    } else {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, config.jwt.privateKey, { algorithm: 'HS256' }, (error, decoded) => {
            if (error) {
                res.status(502);
                res.json({"error": "Invalid token"});
            } else {
                next();
            }
        })
    }
}