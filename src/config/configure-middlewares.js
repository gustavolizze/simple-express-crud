const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const logger = require('express-pino-logger')();
const path = require('path');
const minify = require('express-minify');
const minifyHtml = require('express-minify-html');

const shouldCompress = (req, res) => {
    return (req.headers['x-no-compression'] ? 
                false : compression.filter(req, res));
}

module.exports = (app) => {
    if(!process.env.DISABLE_LOGGER)
        app.use(logger);
    
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(compression({ filter: shouldCompress }));
    app.use(minify());
    app.use(minifyHtml({
        override:      true,
        exception_url: false,
        htmlMinifier: {
            removeComments:            true,
            collapseWhitespace:        true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes:     true,
            removeEmptyAttributes:     true,
            minifyJS:                  true
        }
    }));
    app.use(express.static(path.join(process.cwd(), '/src/app/static')));

    //Routes 
    app.use('/api', require('./../api')); // Api Endpoints
    app.use('/app', require('./../app')); // App Endpoints
    app.use('/', (req, res) => res.redirect('/app/blacklist'));
};