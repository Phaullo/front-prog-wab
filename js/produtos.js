async function buscarProduto(){
    let  prodNome = document.getElementById('buscarProd').value
    if (prodNome){
        const prod = await consultarProduto(`http://localhost:3000/api/produto?nome=${prodNome}`)
        if (prod) exibirProdutos([prod]) // prod vem como objeto, estou jogando dentro do array [ ... ]
        document.getElementById('buscarProd').value = ''
    }else{
        exibirProdutos( await consultarProduto(urlApi) )
    }
}
async function consultarProduto(url) {
    try {
        const getProducts = await fetch(url);
        const allProducts = await getProducts.json();
        return allProducts
    }catch(err){
        return {"error": err}
    }
}

function exibirProdutos(produtos){
    const productGrid = document.querySelector(".products-grid");
    productGrid.innerHTML = '';
    
    if (produtos) {
        produtos.forEach(prod => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            const productImage = document.createElement("img");
            productImage.src = prod.imagemUrl;  /// "./img/feijao-carioca.webp"
            productImage.alt = prod.nome;
            productImage.style.width = '100%';
            productElement.appendChild(productImage);

            const productInfo = document.createElement("div");
            productInfo.innerHTML = `${prod.nome} - R$${prod.preco.toFixed(2)}`;
            productElement.appendChild(productInfo);

            const btnAdicionar = document.createElement("button");
            btnAdicionar.textContent = "Adicionar ao carrinho";
            btnAdicionar.onclick = () => adicionarCarrinho(prod);
            productElement.appendChild(btnAdicionar);

            const btnContainer = document.createElement("div");
            btnContainer.style.display = 'flex';
            btnContainer.style.justifyContent = 'space-between';
            btnContainer.style.marginTop = '10px';

            // const btnEditar = document.createElement("button");
            // btnEditar.textContent = "Editar";
            // btnEditar.onclick = () => editarProduto(btnEditar);
            // btnEditar.id = prod.id;
            // btnContainer.appendChild(btnEditar);

            // const btnExcluir = document.createElement("button");
            // btnExcluir.textContent = "Excluir";
            // btnExcluir.onclick = () => apagarProduto(btnExcluir);
            // btnExcluir.id = prod.id;
            // btnContainer.appendChild(btnExcluir);

            productElement.appendChild(btnContainer);
            productGrid.appendChild(productElement);
        });
    }
}

///  exemplos 
async function criarProduto() {
    const nome = prompt("Digite o nome do produto:");
    if (nome) {
        const preco = prompt("Digite o valor do produto:");
        if (preco) {
            const idSupermcado = prompt("Digite o id do Supermercado")
            const codigo_barras = prompt("Codigo de barras")
            const imagem = prompt("url da imagem ")
            if (idSupermcado){               
                const criarNoBanco = await fetch("http://localhost:3000/api/produto/", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome,
                        codigo_barras, 
                        preco,
                        imagem,
                        "idSupermercado": idSupermcado
                    })
                })
                console.log('criando', criarNoBanco)
                await consultarProduto()
            }
        }
    }
}

async function editarProduto (click){
    console.log('click', click.id)
    const novoNome = prompt("Digite o novo nome")
    const novoPreco = prompt("Digite o novo preço")
    const getProduct = await fetch("http://localhost:3000/api/produto", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "nomeProduto": novoNome,
            "precoProduto": novoPreco,
            "idProduto": click.id
        })
    })
    await consultarProduto()
}

async function apagarProduto (click){
    console.log('click', click.id)
    const removeProduto = await fetch("http://localhost:3000/api/produto", {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "idProduto": click.id
        })
    })
    await consultarProduto()
}