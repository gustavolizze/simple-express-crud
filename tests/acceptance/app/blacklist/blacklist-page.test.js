/// <reference path="./../../../../steps.d.ts" />

const cpfs = new DataTable(['cpf']);
cpfs.add(['434.442.340-23']);
cpfs.add(['060.572.520-98']);

Feature('Testando ações da página de blacklist');

Before((I) => { 
    I.amOnPage('/app/blacklist'); 
});

Scenario('Preenchimento do CPF na pesquisa com mascara', (I) => {
    I.fillField('#search-input', '47740785067');
    I.seeInField('#search-input', '477.407.850-67');
});

Data(cpfs).Scenario('Adicionar alguns CPFs a blacklist', (I, current) => {
     I.fillField('#search-input', current.cpf);
     I.click('#btn-add');
     I.retry(3).see('O CPF foi salvo com sucesso !', '.swal-text');
     I.click('.swal-button.swal-button--confirm');
     I.seeInField('#search-input', '');
});

Data(cpfs).Scenario('Verificar se cpfs são listados', (I, current) => {
    I.see(`CPF: ${current.cpf}`, `//body/main/ul/li/label[text()='CPF: ${current.cpf}']`)
});

Data(cpfs).Scenario('Filtrar CPFs', (I, current) => {
    I.fillField('#search-input', current.cpf);
    I.retry(3).see(`CPF: ${current.cpf}`, `//body/main/ul/li/label`);
});

Data(cpfs).Scenario('Remover CPFs', (I, current) => {
    I.fillField('#search-input', current.cpf);
    I.retry(3).click('//body/main/ul/li/button');
    I.retry(3).seeInField('#search-input', '');
    I.dontSeeElement(`//body/main/ul/li/label[text()='CPF: ${current.cpf}']`);
});

