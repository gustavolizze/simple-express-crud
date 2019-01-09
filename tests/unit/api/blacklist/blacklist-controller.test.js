const { describe, beforeEach, it } = require('mocha');
const chai = require('chai');
const { expect } = require('chai');
const BlackListController = require('./../../../../src/api/blacklist/blacklist-controller');
const { mockReq, mockRes } = require('sinon-express-mock');

chai.use(require('chai-spies'));

describe('Testes unitários com o "blacklist-controller.js"', () => {

    beforeEach(() => {
        this.controller = BlackListController(require('express')());
        this.controller.addOnBlacklist(mockReq({
            body: {
                number: '217.681.760-51'
            }
        }), mockRes());
        this.controller.addOnBlacklist(mockReq({
            body: {
                number: '313.694.100-42'
            }
        }), mockRes());
    });

    it('Deve criar o controlador', () => {
        expect(this.controller).to.be.a('object');
    });

    it('Deve adicionar um cpf na blacklist', () => {
        const request = {
            body: {
                number: '069.827.920-48'
            }
        };
        const req = mockReq(request);
        const res = mockRes();
        chai.spy.on(res, 'status');

        this.controller.addOnBlacklist(req, res);
        
        expect(res.status).to.be.called.with(201);
    });

    it('Deve listar todos os cpfs', () => {
        const req = mockReq();
        const res = mockRes();
        chai.spy.on(res, 'status');
        chai.spy.on(res, 'json');

        this.controller.searchOnBlacklist(req, res);

        expect(res.status).to.be.called.with(200);
        expect(res.json).to.deep.called.with([
            { number: '21768176051', masked: '217.681.760-51' },
            { number: '31369410042', masked: '313.694.100-42' }
        ]);
    });

    it('Deve retornar um cpf', () => {
        const req = mockReq({
            query: {
                number: '217.681.760-51'
            }
        });
        const res = mockRes();
        chai.spy.on(res, 'status');
        chai.spy.on(res, 'json');

        this.controller.searchOnBlacklist(req, res);

        expect(res.status).to.be.called.with(200);
        expect(res.json).to.deep.called.with([
            { number: '21768176051', masked: '217.681.760-51' }
        ]);
    });

    it('Deve remover um cpf', () => {
        const req = mockReq({
            body: {
                number: '21768176051'
            }
        });
        const res = mockRes();
        chai.spy.on(res, 'status');

        this.controller.removeFromBlacklist(req, res);
        expect(res.status).to.be.called.with(204);
    });

});


