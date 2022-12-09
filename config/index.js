const express = require('express');
const path = require('path')
const hbs = require('hbs')


function config(app){
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(express.static(path.join(__dirname, '..', 'public')))

    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '..', 'views'))
    hbs.registerPartials(path.join(__dirname, '..','views', 'partials'))
}


module.exports = { config }