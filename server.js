﻿require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// use JWT auth to secure the api
app.use('/users',jwt());

// api routes
app.use('/users', require('./db/users.controller'));
app.use('/games', require('./db/games.controller'));

// global error handler
app.use(errorHandler);

app.use(express.static(path.join(__dirname,'client/build')));
app.get('/',function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });


// start server
const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
