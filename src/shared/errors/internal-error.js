const {
    ServerError
} = require('./index');
const {
    StatusCode
} = require('./../enums/status-code');

class InternalError extends ServerError {
    constructor(message, data) {
        super(message, StatusCode.InternalError, data);
    }
}

module.exports = InternalError;