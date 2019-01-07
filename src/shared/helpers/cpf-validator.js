const {
    RegexMasks
} = require('./regex-masks');

const buildDigit = (values) => {
    const digit = values
                .map((value, index) => value * (index + 2))
                .reduce((previousValue, currentValue) => previousValue + currentValue) % 11;

    return (digit < 2 ?  0 : 11 - digit);
};

const buildCpf = (cpf) => {
    const numbers = cpf.split('').reverse().slice(2);

    numbers.unshift(buildDigit(numbers));
    numbers.unshift(buildDigit(numbers));
    
    return numbers.reverse().join('');
};

const removeMasks = (cpf) => {
    return cpf.replace(RegexMasks.onlyNumbers, '');
};

const isValidCpf = (cpf) => {
    if (typeof(cpf) !== 'string')
        throw new Error('O cpf deve ser uma string válida');
    
    const cpfWithoutMask = removeMasks(cpf);

    if (cpfWithoutMask.length !== 11)
        throw new Error('Informe um CPF válido.');

    return cpfWithoutMask === buildCpf(cpfWithoutMask);
};


module.exports = {
    isValidCpf,
    removeMasks,
    buildCpf,
    buildDigit
};