const {
    ServerError
} = require('./index');
const {
    StatusCode
} = require('./../enums/status-code');

class BadRequestError extends ServerError {
    constructor(message, data) {
        super(message, StatusCode.BadRequest, data);
    }
}

module.exports = BadRequestError;