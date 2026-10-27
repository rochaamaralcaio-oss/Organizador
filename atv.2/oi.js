
const form = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");
const filtro = document.getElementById("filtro");

let tarefas = [];

// CADASTRAR ATIVIDADES
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const tarefa = {
        id: Date.now(),
        nome: document.getElementById("nome").value.trim(),
        data: document.getElementById("data").value,
        serie: document.getElementById("serie").value.trim(),
        categoria: document.getElementById("categoria").value,
        prioridade: document.getElementById("prioridade").value,
        concluida: false
    };

    tarefas.push(tarefa);

    form.reset();
    renderizarTarefas();
});

// EXIBIR ATIVIDADES
function renderizarTarefas() {
    lista.replaceChildren();

    const categoriaSelecionada = filtro.value;

    const filtradas = tarefas.filter(tarefa =>
        categoriaSelecionada === "Todas" ||
        tarefa.categoria === categoriaSelecionada
    );

    if (filtradas.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhuma atividade encontrada.";
        lista.appendChild(mensagem);
    }

    filtradas.forEach(tarefa => {
        const cartao = document.createElement("article");
        cartao.className = "tarefa";

        if (tarefa.concluida) {
            cartao.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.nome;

        const data = document.createElement("p");
        data.textContent = "Entrega: " + tarefa.data;

        const serie = document.createElement("p");
        serie.textContent = "Série/anime: " + (tarefa.serie || "Nenhum");

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + tarefa.categoria;

        const prioridade = document.createElement("p");
        prioridade.textContent = "Prioridade: " + tarefa.prioridade;

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = tarefa.concluida
            ? "Desmarcar"
            : "Concluir";

        botaoConcluir.addEventListener("click", () => {
            tarefa.concluida = !tarefa.concluida;
            renderizarTarefas();
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";

        botaoExcluir.addEventListener("click", () => {
            tarefas = tarefas.filter(item => item.id !== tarefa.id);
            renderizarTarefas();
        });

        cartao.append(
            titulo,
            data,
            serie,
            categoria,
            prioridade,
            status,
            botaoConcluir,
            botaoExcluir
        );

        lista.appendChild(cartao);
    });

    atualizarProgresso();
}

// FILTRAR POR CATEGORIA
filtro.addEventListener("change", renderizarTarefas);

// CALCULAR PROGRESSO
function atualizarProgresso() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const porcentagem = total === 0
        ? 0
        : Math.round((concluidas / total) * 100);

    document.getElementById("contador").textContent =
        `${concluidas} de ${total} atividades concluídas`;

    document.getElementById("barraProgresso").value = porcentagem;

    document.getElementById("porcentagem").textContent =
        `${porcentagem}% concluído`;
}

// INICIAR A PÁGINA
renderizarTarefas();
