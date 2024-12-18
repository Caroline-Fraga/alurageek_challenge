const BASE_URL = "https://6762c6fb17ec5852cae70da5.mockapi.io/produtos";

const produtoLista = async () => {
    try {
        const resposta = await fetch(BASE_URL);
        const dado = await resposta.json();
        return dado;
    } catch (error) {
        console.log("Erro ao buscar produtos:", error) 
    }
}

const criarProduto = async (nome, preco, imagem) => {
    try {
        const resposta = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, preco, imagem }),
        });
        const dado = await resposta.json();
        return dado;
    } catch (error) {
        console.log("Erro ao criar produto:", error)
    }
}; 

const deletarProduto = async (id) => {
    try {
        const resposta = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar produto");
        }
    } catch (error) {
        console.log("Erro ao deletar produto:", error);
    }
};


export const servicosProdutos = {
    produtoLista,
    criarProduto,
    deletarProduto,
};

