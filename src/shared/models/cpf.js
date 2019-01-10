const { isValidCpf, removeMasks } = require('./../helpers/cpf-validator'); 
const { BadRequestError } = require('./../errors');
class CPF {

    constructor(cpfNumber) {
        if (isValidCpf(cpfNumber) === false) 
            throw new BadRequestError('Informe um cpf válido');

        this.number = removeMasks(cpfNumber);
        this.masked = this.number
                          .replace(/(\d{3})(\d)/, "$1.$2")
                          .replace(/(\d{3})(\d)/, "$1.$2")
                          .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        Object.freeze(this);
    }

}

module.exports.CPF = CPF;