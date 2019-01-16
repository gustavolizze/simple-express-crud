const { describe, beforeEach, afterEach, it } = require('mocha');
const request = require('supertest');

describe('Testes unitários do "server.js"', () => {

    beforeEach(() => {
        this.server = require('./../../src/server');
    });

    afterEach(() => {
        this.server.close();
    });

    it('Deve inicializar o server', (done) => {
        request(this.server)
            .get('/health-check')
            .expect(200, done);
    });

});