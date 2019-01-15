function cpfMask (cpf) {
    if (!cpf) 
        return '';
    
    cpf = cpf.replace(/\D/g, "")

    if (cpf.length > 11)
        cpf = cpf.substring(0, 11);

    return cpf
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

function createCpfMask (object) {
    obj=object;
    setTimeout(function () { obj.value = cpfMask(obj.value);  }, 1);
};
