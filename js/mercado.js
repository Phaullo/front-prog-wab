async function criarMercado() {
    const nome = prompt("Digite o nome do produto:");
    if (nome) {
        const endereco = prompt("Digite o endereco do produto:");
        if (endereco) {
            const listaDeMercados = document.getElementById("listaMercados");
            
            const criarNoBanco = await fetch("http://localhost:3000/api/supermercado/", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "nome": nome,
                    "localizacao": endereco
                })
            })
            console.log('criando', criarNoBanco)
            await consultarMercado()
        }
    }
}

async function consultarMercado (click){
    const listaDeMercados = document.getElementById("listaMercados");
    listaDeMercados.innerHTML = ''
    const getMarket = await fetch("http://localhost:3000/api/supermercados")
    const allMarket = await getMarket.json() 

    if (allMarket){
        allMarket.forEach(mercado => {
            const li = document.createElement("li");
            li.innerHTML = mercado.nome + " - Localização" + mercado.localizacao + " <button onclick=\"editarMercado(this)\" id='"+mercado.id+"'>Editar</button>";
            li.id=mercado.id
            listaDeMercados.appendChild(li);
        });
    }
}

async function editarMercado (click){
    console.log('click', click.id)
    const novoNome = prompt("Digite o novo nome")
    const novoEndereco = prompt("Digite o novo preço")
    const editarMercado = await fetch("http://localhost:3000/api/supermercado", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "idMercado":click.id, 
            "nomeMercado": novoNome, 
            "enderecoMercado": novoEndereco
            })
    })
    await consultarMercado()
}

