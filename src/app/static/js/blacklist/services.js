async function handleResponse (response) {
    var text = await response.text();
    var body;

    if (text)
        body = JSON.parse(text);
                    
    if (response.ok)
        return body;
    else if ('message' in body)
        throw new Error(body.message);
    else 
        throw new Error('Serviço indisponível');
};

function getAllCpfs () {
    return fetch('/api/blacklist')
            .then(handleResponse);
};

function getByCpfNumber (cpfNumber) {
    return fetch(`/api/blacklist?number=${encodeURI(cpfNumber)}`)
            .then(handleResponse)
};

function addNewCpfToBlacklist (cpfNumber) {
    return fetch(`/api/blacklist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ number: cpfNumber })
    })
    .then(handleResponse);
};

function removeCpfFromBlacklist (cpfNumber) {
    return fetch(`/api/blacklist`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ number: cpfNumber })
    })
    .then(handleResponse);
};