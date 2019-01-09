const {
    BlacklistService
} = require('./blacklist-service');
const {
    StatusCode
} = require('./../../shared/enums/status-code');


class BlacklistController {

    constructor(app) {
        this.service = new BlacklistService();
        
        app.route('/blacklist')
           .get(this.searchOnBlacklist.bind(this))
           .post(this.addOnBlacklist.bind(this))
           .delete(this.removeFromBlacklist.bind(this));
    }
    
    searchOnBlacklist(request, response) {
        const { number } = request.query;
        let result;

        if (number)
            result = this.service.getByCpfNumber(number);
        else 
            result = this.service.getAll();

        return response.status(StatusCode.Success).json(result);
    }

    addOnBlacklist(request, response) {
        this.service.add(request.body.number);
        return response.status(StatusCode.Created);
    }

    removeFromBlacklist(request, response) {
        this.service.remove(request.body.number);
        return response.status(StatusCode.NoContent);
    }
}


module.exports = (app) => {
    return new BlacklistController(app);
};