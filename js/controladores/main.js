import { servicosProdutos } from "../servicos/produto-servicos.js";

const produtoContainer = document.querySelector("[data-produto]");
const form = document.querySelector("[data-form]");
const mensagemSucesso = document.getElementById("mensagem-sucesso");
const mensagemErro = document.getElementById("mensagem-erro");

function criarCartao({ nome, preco, imagem, id }) {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao");
    cartao.innerHTML = `
        <img src="${imagem}" alt="${nome}">
        <div class="cartaoInfo">
            <div class="cartaoInfo__nome">
                <p>${nome}</p>
            </div>
            <div class="cartaoInfo__valor">
                <p class="cartaoInfo__valor__preco">R$ ${preco}</p>
                <button class="cartaoInfo__valor__botaoDeletar" data-id="${id}">
                    <img src="./imagens/lixeira.png" alt="Deletar produto">
                </button>
            </div>
        </div>
    `;
    return cartao;
}

const renderizarProdutos = async () => {
    try {
        const listarProdutos = await servicosProdutos.produtoLista();
        listarProdutos.forEach((produto) => {
            const produtoCartao = criarCartao(produto);
            produtoContainer.appendChild(produtoCartao);
        });
    } catch (error) {
        console.log("Erro ao renderizar produtos:", error);
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.querySelector("[data-nome]").value;
    const preco = document.querySelector("[data-preco]").value;
    const imagem = document.querySelector("[data-imagem]").value;

    try {
        const newProduto = await servicosProdutos.criarProduto(nome, preco, imagem);
        const newCartao = criarCartao(newProduto);
        produtoContainer.appendChild(newCartao);
    } catch (error) {
        console.log("Erro ao criar produto:", error);
    }
    form.reset();
});

produtoContainer.addEventListener("click", async (event) => {
    if (event.target.closest(".cartaoInfo__valor__botaoDeletar")) {
        const botaoDeletar = event.target.closest(".cartaoInfo__valor__botaoDeletar");
        const produtoId = botaoDeletar.dataset.id;

        try {
            await servicosProdutos.deletarProduto(produtoId);
 
            const cartao = botaoDeletar.closest(".cartao");
            cartao.remove();
        } catch (error) {
            console.log("Erro ao deletar produto:", error);
        }
    }
});

renderizarProdutos();
