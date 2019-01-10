const {
    ServerError
} = require('./../shared/errors');
const {
    StatusCode
} = require('./../shared/enums/status-code');

const defaultMessage = {
    message: 'Houve um erro no processamento do seu pedido, tente novamente mais tarde.',
    data: '',
    status: StatusCode.InternalError
};

const errorHandler = (error, request, response, next) => {
    let result = defaultMessage;

    if (error instanceof ServerError) 
        result = error;
    
    response.status(result.status).json({ message: result.message, data: result.data });
    next();
}

module.exports = {
    defaultMessage,
    errorHandler
};