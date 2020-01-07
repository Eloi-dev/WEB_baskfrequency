var express = require('express');
var dashboard = express.Router();
var adherents = require('../controllers/adherents');
var middleware = require('../controllers/middleware');

dashboard.use(middleware)
.get('/adherents', adherents.get)
.get('/adherents/:id', adherents.getById)
.post('/adherents', adherents.post)
.put('/adherents/:id', adherents.put)
.delete('/adherents/:id', adherents.delete);

module.exports = dashboard;