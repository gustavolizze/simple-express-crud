const { describe, beforeEach, it } = require('mocha');
const chai = require('chai');
const { expect } = require('chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const { errorHandler } = require('./../../../src/config/configure-error-handler');
const { ConflictError } = require('./../../../src/shared/errors');

chai.use(require('chai-spies'));

describe('Testes unitários do "configure-error-handler.js"', () => {

    beforeEach(() => {
        this.request = mockReq();
        this.response = mockRes();
        this.next = () => {};
        chai.spy.on(this.response, ['status', 'json']);
    });

    it('Deve retornar o erro padrão', () => {
        errorHandler(new Error('Deu Ruim !'), this.request, this.response, this.next);

        expect(this.response.status).to.be.called.with(500);
        expect(this.response.json).to.deep.called.with({
            message: 'Houve um erro no processamento do seu pedido, tente novamente mais tarde.',
            data: ''
        });
    });

    it('Deve retornar um erro customizado', () => {
        const error = new ConflictError('Já existente na base de dados!', { number: '259.268.440-96' }); 
        errorHandler(error, this.request, this.response, this.next);

        expect(this.response.status).to.be.called.with(error.status);
        expect(this.response.json).to.deep.called.with({
            message: error.message,
            data: error.data
        });
    });
});