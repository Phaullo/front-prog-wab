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

async function consultarProduto(event) {
    const li = document.getElementById("listaProdutos");
    li.innerHTML = '';
    const getProducts = await fetch("http://localhost:3000/api/produto");
    const allProducts = await getProducts.json();

    if (allProducts) {
        allProducts.forEach(prod => {
            const liElement = document.createElement("li");
            liElement.innerHTML = prod.nome + " - R$" + prod.preco;

            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.onclick = () => editarProduto(btnEditar);
            btnEditar.id = prod.id;
            liElement.appendChild(btnEditar);

            const btnExcluir = document.createElement("button");
            btnExcluir.textContent = "Excluir";
            btnExcluir.onclick = () => apagarProduto(btnExcluir);
            btnExcluir.id = prod.id;
            liElement.appendChild(btnExcluir);

            listaProdutos.appendChild(liElement);
        });
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