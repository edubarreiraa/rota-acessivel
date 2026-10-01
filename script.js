const locais = [
  {
    nome: "Café Horizonte",
    tipo: "Cafeteria",
    endereco: "Centro · 0,4 km",
    icone: "☕",
    cor: "#f8d9a6",
    acessibilidade: ["rampa", "banheiro"],
    descricao: "Cafeteria com entrada nivelada e ambiente tranquilo."
  },
  {
    nome: "Biblioteca Municipal",
    tipo: "Espaço público",
    endereco: "Centro · 0,7 km",
    icone: "📚",
    cor: "#d0e8df",
    acessibilidade: ["rampa", "banheiro", "elevador"],
    descricao: "Espaço público com elevador e banheiros adaptados."
  },
  {
    nome: "Mercado BomPreço",
    tipo: "Mercado",
    endereco: "Bairro Novo · 1,2 km",
    icone: "🛒",
    cor: "#f6d1c9",
    acessibilidade: ["rampa", "vaga"],
    descricao: "Mercado com vagas reservadas e corredores amplos."
  },
  {
    nome: "Praça das Artes",
    tipo: "Lazer",
    endereco: "Jardim Sul · 1,6 km",
    icone: "🌳",
    cor: "#d7edd0",
    acessibilidade: ["rampa", "banheiro", "vaga"],
    descricao: "Centro cultural com rampa e banheiro adaptado."
  },
  {
    nome: "Esquina da Cerveja",
    tipo: "Adega e distribuidora",
    endereco: "Av. Araguaia, 242, St. Padre Josino, Xambioá–TO",
    icone: "🍺",
    imagem: "imagens/esquina.png",
    cor: "#f6d1c9",
    acessibilidade: ["rampa"],
    descricao: "Adega e distribuidora com rampa de acesso."
  },
  {
    nome: "Hotel Rio Araguaia",
    tipo: "Hotel",
    endereco: "R. Rui Barbosa, 42, St. Padre Josino, Xambioá–TO",
    icone: "🏨",
    imagem: "imagens/hotel.png",
    cor: "#d0e8df",
    acessibilidade: ["rampa", "vaga", "banheiro"],
    descricao: "Hotel com rampa de acesso, vaga reservada e banheiro acessível."
  }
];

const nomesRecursos = {
  rampa: "♿ Rampa",
  banheiro: "🚻 Banheiro",
  vaga: "🅿 Vaga",
  elevador: "↕ Elevador"
};

let filtroAtual = "todos";

const cards = document.querySelector("#cards");
const contagem = document.querySelector("#contagem");
const termo = document.querySelector("#termo");
const modal = document.querySelector("#modal");
const detalhe = document.querySelector("#detalhe");

function mostrarLocais(busca = "") {
  const texto = busca.toLowerCase().trim();

  const encontrados = locais.filter((local) => {
    const atendeFiltro =
      filtroAtual === "todos" ||
      local.acessibilidade.includes(filtroAtual);

    const atendeBusca =
      `${local.nome} ${local.tipo} ${local.endereco}`
        .toLowerCase()
        .includes(texto);

    return atendeFiltro && atendeBusca;
  });

  contagem.textContent =
    `${encontrados.length} locais encontrados perto de você`;

  cards.innerHTML = encontrados.map((local) => `
    <article class="card">
      ${local.imagem
        ? `<img class="imagem-local" src="${local.imagem}" alt="Fachada de ${local.nome}">`
        : `<div class="icone" style="--cor: ${local.cor}">${local.icone}</div>`}

      <div class="info">
        <span class="tipo">${local.tipo}</span>
        <h3>${local.nome}</h3>
        <p class="endereco">⌖ ${local.endereco}</p>

        ${local.acessibilidade
          .map((recurso) =>
            `<span class="tag">${nomesRecursos[recurso]}</span>`
          )
          .join("")}
      </div>

      <button class="ver" data-indice="${locais.indexOf(local)}">
        Ver detalhes →
      </button>
    </article>
  `).join("");

  if (encontrados.length === 0) {
    cards.innerHTML = "<p>Nenhum local encontrado.</p>";
  }
}

document.querySelectorAll(".filtro").forEach((botao) => {
  botao.addEventListener("click", () => {
    document.querySelector(".filtro.ativo").classList.remove("ativo");
    botao.classList.add("ativo");

    filtroAtual = botao.dataset.filtro;
    mostrarLocais(termo.value);
  });
});

document.querySelector("#busca").addEventListener("submit", (evento) => {
  evento.preventDefault();
  mostrarLocais(termo.value);

  document.querySelector("#locais").scrollIntoView({
    behavior: "smooth"
  });
});

cards.addEventListener("click", (evento) => {
  const botao = evento.target.closest("[data-indice]");

  if (!botao) return;

  const local = locais[botao.dataset.indice];

  detalhe.innerHTML = `
    <h2>${local.icone} ${local.nome}</h2>
    <p><strong>${local.tipo}</strong> · ${local.endereco}</p>
    <p>${local.descricao}</p>

    <h3>Recursos confirmados</h3>
    <ul>
      ${local.acessibilidade
        .map((recurso) => `<li>${nomesRecursos[recurso]}</li>`)
        .join("")}
    </ul>
  `;

  modal.showModal();
});

document.querySelector(".fechar").addEventListener("click", () => {
  modal.close();
});

document.querySelector("#sugerir").addEventListener("click", () => {
  alert("Em uma versão completa, este botão abriria o formulário de cadastro de um novo local.");
});

mostrarLocais();