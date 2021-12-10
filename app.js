const app = require('express')()
require('dotenv').config();
require('./config').config(app)
require('./config/session.config').sessionInit(app);
require('./db').connectDB();


const indexRoutes = require('./routes');
app.use('/', indexRoutes)

module.exports = app;


