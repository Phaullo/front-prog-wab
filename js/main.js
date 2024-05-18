async function showDiv(formName) {
    var sections = document.querySelectorAll('.content');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });
    document.getElementById(formName).style.display = 'block';

    if (formName === "produtos") await consultarProduto()

}

var cart = [];

function updateCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    cartTableBody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const valorTotal = item.quantidade * item.precoUnitario;
        total += valorTotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$${item.precoUnitario.toFixed(2)}</td>
            <td>R$${valorTotal.toFixed(2)}</td>
        `;
        cartTableBody.appendChild(tr);
    });

    const totalElement = document.getElementById('total-price');
    totalElement.innerText = total.toFixed(2);
}

function addToCart(productName) {
    const existingProduct = cart.find(item => item.nome === productName);
    if (existingProduct) {
        existingProduct.quantidade += 1;
    } else {
        cart.push({ nome: productName, quantidade: 1, precoUnitario: 1 }); 
    }
    document.getElementById('cart-count').innerText = cart.reduce((acc, item) => acc + item.quantidade, 0);
    updateCart();
}
