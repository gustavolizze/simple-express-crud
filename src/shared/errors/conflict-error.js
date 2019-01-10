const {
    ServerError
} = require('./index');
const {
    StatusCode
} = require('./../enums/status-code');

class ConflictError extends ServerError {
    constructor(message, data) {
        super(message, StatusCode.Conflict, data);
    }
}

module.exports = ConflictError;