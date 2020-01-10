var express = require('express');
var login = express.Router();
var loginController = require('../controllers/login');

login.post('/login', loginController.post);

module.exports = login;