var express = require('express');
var dashboard = express.Router();
var adherents = require('../controllers/adherents');
var authentication= require('../middlewares/authentication');

dashboard.use(authentication)
.get('/adherents', adherents.get)
.get('/adherents/:id', adherents.getById)
.post('/adherents', adherents.post)
.put('/adherents/:id', adherents.put)
.delete('/adherents/:id', adherents.delete);

module.exports = dashboard;