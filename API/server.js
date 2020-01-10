var express = require('express');
var app = express();
var dashboard = require('./routes/dashboard');
var login = require('./routes/login');
var bodyParser = require('body-parser');
var config = require('./config/config');
var headerMiddleware = require('./middlewares/headers');

app.use(bodyParser.json());
app.use(headerMiddleware);
app.use(login);
app.use(dashboard);

app.listen(config.server.port, config.server.ip, () => {
    console.log("Serving on http://" + config.server.ip + ':' + config.server.port);
})

