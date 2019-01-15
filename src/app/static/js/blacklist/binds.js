const containerId = 'search-result';
const searchInputId = 'search-input';
const debounceInstance = debounce();

function clearBlacklist () {
    const container = document.getElementById(containerId);
    while (container.firstChild)
        container.removeChild(container.firstChild);
};

function getEmptyTemplate () {
    const li = document.createElement('li');
    li.classList.add('search-result-item');

    let label = document.createElement('label');
    label.innerText = `Nenhum CPF na blacklist atual.`;
    li.appendChild(label);

    return li;
};

function getCpfTemplate (cpfNumber) {
    const li = document.createElement('li');
    li.classList.add('search-result-item');
    const btn = document.createElement('button');
    btn.innerText = "x";
    btn.addEventListener('click', function (){
        removeCpfFromBlacklist(cpfNumber)
                .then(result => {
                    showSuccessAlert('Remover Cpf', 'CPF removido da blacklist com sucesso!');
                    trySearchAllCpfs();
                })
                .catch(error => showErrorAlert('Remover Cpf', error.message));
    });
    li.appendChild(btn);

    let label = document.createElement('label');
    label.innerText = `CPF: ${cpfNumber}`;
    li.appendChild(label);

    return li;
}

function processBlacklist (apiResult) {
    const container = document.getElementById(containerId);
    const results = (apiResult || []);

    clearBlacklist();
    
    if (results.length <= 0) 
        container.appendChild(getEmptyTemplate()); 
    else 
        results.map(item => container.appendChild(getCpfTemplate(item.masked)));
}

function searchAllCpfs() {
    getAllCpfs()
        .then(processBlacklist)
        .catch(error => showErrorAlert('Salvar Cpf', error.message));
}

function searchByCpfNumber (value) {
    getByCpfNumber(value)
        .then(processBlacklist)
        .catch(error => showErrorAlert('Salvar Cpf', error.message));
}

function processSearch (element) {
    createCpfMask(element);
    debounceInstance.on(() => {
        if (element.value.length > 0)
            searchByCpfNumber(element.value);
        else 
            searchAllCpfs();
    });
}

async function trySearchAllCpfs() {
    try {
        await searchAllCpfs();
    }
    catch(e) {
        showErrorAlert('Buscar Cpfs', error.message);
    }
}


async function addNewCpf () {
    try {
        const input = document.getElementById(searchInputId);
        const cpf = input.value;    
        
        await addNewCpfToBlacklist(cpf);
        input.value = '';

        showSuccessAlert('Adicionar CPF', 'O CPF foi adicionado com sucesso !');
        trySearchAllCpfs();
    }
    catch (error) {
        showErrorAlert('Salvar Cpf', error.message);
    }
};

