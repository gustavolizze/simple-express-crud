const { describe, it } = require('mocha');
const { expect } = require('chai');
const { BlacklistService } = require('./../../../../src/api/blacklist/blacklist-service');
const { ConflictError, BadRequestError, InternalError } = require('./../../../../src/shared/errors');

describe('Testes unitários com o "blacklist-service.js" ', () => {


    it('Deve criar um novo serviço e inicializar suas propriedades corretamente', () => {
        const service = new BlacklistService();
        expect(service).to.be.a('object');
        expect(service._blacklist).to.be.a('array');
        expect(service._blacklist).to.be.empty;
    });

    describe('Validações e regras para inclusão', () => {

        it('Deve adicionar um novo cpf', () => {
            const service = new BlacklistService();
            service.add('073.890.760-03');
    
            expect(service._blacklist).to.deep.equal([{ 
                number: '07389076003', 
                masked: '073.890.760-03' 
            }]);
        });

        it('Não deve adicionar um cpf inválido', () => {
            const service = new BlacklistService();
            const tryAdd = () => service.add('073.890.760-00');
            expect(tryAdd).to.throw(BadRequestError, 'Informe um cpf válido');
        });

        it('Não deve adicionar dois CPFs iguais', () => {
            const service = new BlacklistService();
            service.add('073.890.760-03');
            const tryAdd = () => service.add('073.890.760-03');

            expect(service._blacklist).to.deep.equal([{ 
                number: '07389076003', 
                masked: '073.890.760-03' 
            }]);

            expect(tryAdd).to.throw(ConflictError, 'Este CPF já foi adicionado.');
        });
    });

    describe('Validações e regras para remoção', () => {
        
        it('Deve remover um cpf', () => {
            const service = new BlacklistService();
            service.add('073.890.760-03');
            service.remove('073.890.760-03');

            expect(service._blacklist).to.be.empty;
        });

        it('Deve retornar um erro caso o cpf seja inválido', () => {
            const service  = new BlacklistService();
            const tryRemove = () => service.remove('073.890.760-00');

            expect(tryRemove).to.throw(BadRequestError, 'Informe um cpf válido');
        }); 

        it('Deve retornar um erro caso não exista nenhum cpf na blacklist', () => {
            const service = new BlacklistService();
            const tryRemove = () => service.remove('073.890.760-03');

            expect(tryRemove).to.throw(InternalError, 'Não existe nenhum cpf para ser removido');
        });

        it('Deve retornar um erro em caso de cpf não existente', () => {
            const service = new BlacklistService();
            service.add('372.159.060-00');
            const tryRemove = () => service.remove('073.890.760-03');

            expect(tryRemove).to.throw(BadRequestError, 'O Cpf informado não está na blacklist');
        });

    });

    describe('Validações para busca de um cpf', () => {
        it('Deve buscar um cpf pelo numero', () => {
            const service = new BlacklistService();
    
            service.add('073.890.760-03');
            service.add('339.968.620-08');
    
            const result = service.getByCpfNumber('073.890.760-03');
    
            expect(result).to.deep.equal([{
                number: '07389076003',
                masked: '073.890.760-03'
            }]);
        });

        it('Se informado o parametro de busca vazio então deve retornar um erro', () => {
            const service = new BlacklistService();
            const trySearch = () => service.getByCpfNumber('');

            expect(trySearch).to.throw(Error, 'Informe um cpf para a pesquisa');
        });

        it('Caso não encontrado deve retornar um array vazio', () => {
            const service = new BlacklistService();
            const result = service.getByCpfNumber('45859');

            expect(result).to.be.a('array');
            expect(result).to.be.empty;
        });
    });

    describe('Validações e testes para a busca de toda a blacklist', () => {

        it('Deve retornar todos os cpfs', () => {
            const service = new BlacklistService();
    
            service.add('073.890.760-03');
            service.add('339.968.620-08');
    
            const result = service.getAll();
    
            expect(result).to.deep.equal([{
                number: '07389076003',
                masked: '073.890.760-03'
            }, {
                number: '33996862008',
                masked: '339.968.620-08'
            }]);
        });

        it('Deve retornar uma listagem vazia', () => {
            const service = new BlacklistService();
            const result = service.getAll();
            
            expect(result).to.be.empty;
            expect(result).to.be.a('array');
        });
    });
});