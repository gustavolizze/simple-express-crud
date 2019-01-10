const { describe, it } = require('mocha');
const { expect } = require('chai');
const { buildDigit, buildCpf, removeMasks, isValidCpf } = require('./../../../../src/shared/helpers/cpf-validator');
const { BadRequestError } = require('./../../../../src/shared/errors');

describe('Testes unitários do arquivo "cpf.validator.js"', () => {
    
    //583.264.720.34

    it('Deve calcular o digito corretamente', () => {
        expect(buildDigit([5, 8, 3, 2, 6, 4, 7, 2, 0].reverse())).to.equal(3);
    });

    it('Deve montar um cpf corretamente', () => {
        expect(buildCpf('58326472000')).to.equal('58326472034');
    });

    it('Deve retornar somente os numeros de um cpf', () => {
        expect(removeMasks('583.264.72/0-00')).to.equal('58326472000');
    });

    it('Deve validar um cpf', () => {
        expect(isValidCpf('583.264.720.34')).to.be.true;
    });

    it('Deve validar um cpf incorreto', () => {
        expect(isValidCpf('583.264.720.05')).to.be.false;
    });

    it('Deve retornar um erro em caso de cpf inválido', () => {
        expect(isValidCpf).to.throw(BadRequestError, 'O cpf deve ser uma string válida');
    });
});
