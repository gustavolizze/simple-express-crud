module.exports.configureExpress = require('./configure-express');
module.exports.configureHealthCheck = require('./configure-health-check');
module.exports.configureMiddlewares = require('./configure-middlewares');
module.exports.configureErrorHandler = (app) => {
    const { errorHandler } = require('./configure-error-handler')
    app.use(errorHandler);
};