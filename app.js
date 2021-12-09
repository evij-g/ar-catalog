const app = require('express')()
require('dotenv').config();
require('./config/session.config')(app)
require('./config').config(app)
require('./db').connectDB();


const indexRoutes = require('./routes');
app.use('/', indexRoutes)

module.exports = app;


