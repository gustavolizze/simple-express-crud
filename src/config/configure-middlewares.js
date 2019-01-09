const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const shouldCompress = (req, res) => {
    return (req.headers['x-no-compression'] ? 
                false : compression.filter(req, res));
}

module.exports = (app) => {
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(compression({ filter: shouldCompress }));
};