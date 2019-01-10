const app = require('express')();
const colors = require('colors/safe');
const {
    configureExpress,
    configureHealthCheck,
    configureMiddlewares,
    configureErrorHandler
} = require('./config');

configureExpress(app);
configureMiddlewares(app);
configureHealthCheck(app);
configureErrorHandler(app);

module.exports = app.listen(process.env.port || 3000, () => {
    console.log(
        colors.red(`Servidor iniciado na porta: ${process.env.port || 3000}`));
});