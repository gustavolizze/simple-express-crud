const express = require('express');
const path = require('path');

module.exports = (app) => {
    app.set('view engine', 'ejs');
    app.set('views','./app/views/');
    app.use(express.static(path.resolve(__dirname, 'app/public')));

    //Routes 
    app.use('/api', require('./../api')); // Api Endpoints
}