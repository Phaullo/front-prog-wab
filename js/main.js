async function showForm(formName) {
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(function (form) {
        form.classList.remove('show');
    });

    const selectedForm = document.getElementById(formName + 'Form');
    selectedForm.classList.add('show');
    console.log('formName', formName)
    
    if (formName === "produtos") await consultarProduto()
    if (formName === "mercados") await consultarMercado()
}