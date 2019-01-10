const {
    removeMasks,
    isValidCpf
} = require('./../../shared/helpers/cpf-validator');
const {
    CPF
} = require('./../../shared/models/cpf');
const {
    BadRequestError,
    InternalError,
    ConflictError
} = require('./../../shared/errors');

class BlacklistService {

    constructor() {
        this._blacklist = [];
    }

    add(cpfNumber) {
        const cpf = new CPF(cpfNumber);
        const cpfHasAlreadyBeenRegistered = this.getByCpfNumber(cpf.number)[0];

        if (cpfHasAlreadyBeenRegistered) 
            throw new ConflictError('Este CPF já foi adicionado.');

        this._blacklist.push(cpf);
    }

    remove(cpfNumber) {
        if (isValidCpf(cpfNumber) === false) 
            throw new BadRequestError('Informe um cpf válido');
            
        if (!this._blacklist.length) 
            throw new InternalError('Não existe nenhum cpf para ser removido');
        
        let cpf = this.getByCpfNumber(cpfNumber)[0];

        if (!cpf) 
            throw new BadRequestError('O Cpf informado não está na blacklist.');

        this._blacklist = this._blacklist.filter((item) => (item.number !== cpf.number)) || [];
    }

    getByCpfNumber(cpfNumber) {
        const cpfSearch = removeMasks(cpfNumber || '');
        const isValidSearch = cpfSearch.length > 0;
        const hasBlacklist = this._blacklist.length > 0;
                
        if (isValidSearch === false)
            throw new BadRequestError('Informe um cpf para a pesquisa');

        if (hasBlacklist === false)
            return []; 

        return this._blacklist.filter(cpf => cpf.number.startsWith(cpfSearch));
    }

    getAll() {
        return this._blacklist.slice() || [];
    }
}


module.exports.BlacklistService = BlacklistService;