function showAlert(options) {
    if (swal)
        swal(options);
    else
        alert(options.text);
}

function showErrorAlert(title, text) {
    showAlert({
        title: title,
        text: text,
        icon: "error"
    });
}

function showSuccessAlert(title, text) {
    showAlert({
        title: title,
        text: text,
        icon: "success",
    });
}

function showInfoAlert(title, text) {
    showAlert({
        title: title,
        text: text,
        icon: "info"
    });
}