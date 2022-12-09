/*const app = require('express')()*/
var express = require('express');
var app = express();
require('dotenv').config();
require('./config').config(app)
require('./db').connectDB();
require('./config/session.config').sessionInit(app);



const indexRoutes = require('./routes');
app.use('/', indexRoutes);

module.exports = app;