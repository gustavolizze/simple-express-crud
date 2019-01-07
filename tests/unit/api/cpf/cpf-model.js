const { describe, it } = require('mocha');
const { expect } = require('chai');
const { CPF } = require('./../../../../src/api/cpf/cpf-model');

describe('Testes unitários com o "cpf-model.js"', () => {

    //232.817.730-10

    it('Deve criar um cpf e validar numero e mascara', () => {
        const cpf = new CPF('232.817.730-10');
        expect(cpf.number).to.equal('23281773010');
        expect(cpf.masked).to.equal('232.817.730-10');
    });

    it('Deve retornar um erro caso o cpf seja inválido', () => {
        const cpfFn = () => new CPF('');
        expect(cpfFn).to.throw();
    });

});