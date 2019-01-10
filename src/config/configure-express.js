const path = require('path');

module.exports = (app) => {
    app.set('views', path.join(process.cwd(), '/src/app/pages'));
    app.set('view engine', 'ejs');
}