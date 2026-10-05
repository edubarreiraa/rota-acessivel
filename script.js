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
  },
  {
    nome: "Hotel Tomazini",
    tipo: "Hospedagem",
    endereco: "Av. Antonio Maranhão, s/n, Centro, Xambioá–TO, 77880-000",
    icone: "🏨",
    cor: "#d0e8df",
    acessibilidade: [],
    descricao: "Hotel listado em Xambioá. Acessibilidade ainda não verificada.",
    fonte: "Solutudo",
    fonteUrl: "https://www.solutudo.com.br/empresas/to/xambioa/hoteis/c-mendes-de-sousa-ltda-42481126"
  },
  {
    nome: "Restaurante Mangueirão",
    tipo: "Restaurante",
    endereco: "Av. Presidente Getúlio Vargas, 635, sala B, Baixa Fria, Xambioá–TO",
    icone: "🍽️",
    cor: "#f8d9a6",
    acessibilidade: [],
    descricao: "Restaurante listado em Xambioá. Acessibilidade ainda não verificada.",
    fonte: "Tripadvisor",
    fonteUrl: "https://www.tripadvisor.com.br/Restaurant_Review-g2577948-d8181595-Reviews-Restaurante_Mangueirao-Xambioa_State_of_Tocantins.html"
  },
  {
    nome: "Palácio do Cristal",
    tipo: "Órgão público",
    endereco: "Av. E, Quadra 8, Setor Leste, Xambioá–TO",
    icone: "🏛️",
    cor: "#d7edd0",
    acessibilidade: [],
    descricao: "Sede da Prefeitura Municipal de Xambioá. Acessibilidade ainda não verificada.",
    fonte: "Prefeitura de Xambioá",
    fonteUrl: "https://xambioa.to.gov.br/"
  },
  {
    nome: "Orla Principal – Beira-Rio",
    tipo: "Lazer",
    endereco: "Orla Principal, Beira-Rio, Xambioá–TO",
    icone: "🌊",
    cor: "#d0e8df",
    acessibilidade: [],
    descricao: "Espaço público citado pela Prefeitura. Acessibilidade ainda não verificada.",
    fonte: "Prefeitura de Xambioá",
    fonteUrl: "https://xambioa.to.gov.br/fundo-da-infancia-e-adolescencia-promove-show-de-talentos-para-criancas-e-adolescentes-de-xambioa/"
  }
];

const nomesRecursos = {
  rampa: "♿ Rampa",
  banheiro: "🚻 Banheiro",
  vaga: "🅿 Vaga",
  elevador: "↕ Elevador"
};

const filtrosSelecionados = new Set();

const cards = document.querySelector("#cards");
const contagem = document.querySelector("#contagem");
const termo = document.querySelector("#termo");
const modal = document.querySelector("#modal");
const detalhe = document.querySelector("#detalhe");
let localSelecionado = null;

function linkGoogleMaps(local) {
  const consulta = encodeURIComponent(`${local.nome} ${local.endereco}`);
  return `https://www.google.com/maps/search/?api=1&query=${consulta}`;
}

function mostrarLocais(busca = "") {
  const texto = busca.toLowerCase().trim();

  const encontrados = locais.filter((local) => {
    const atendeFiltros = [...filtrosSelecionados].every((filtro) =>
      local.acessibilidade.includes(filtro)
    );

    const atendeBusca =
      `${local.nome} ${local.tipo} ${local.endereco}`
        .toLowerCase()
        .includes(texto);

    return atendeFiltros && atendeBusca;
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

        ${local.acessibilidade.length
          ? local.acessibilidade
            .map((recurso) => `<span class="tag">${nomesRecursos[recurso]}</span>`)
            .join("")
          : '<span class="tag pendente">Acessibilidade não verificada</span>'}
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
    const filtro = botao.dataset.filtro;

    if (filtro === "todos") {
      filtrosSelecionados.clear();
    } else if (filtrosSelecionados.has(filtro)) {
      filtrosSelecionados.delete(filtro);
    } else {
      filtrosSelecionados.add(filtro);
    }

    document.querySelectorAll(".filtro").forEach((opcao) => {
      const selecionado = opcao.dataset.filtro === "todos"
        ? filtrosSelecionados.size === 0
        : filtrosSelecionados.has(opcao.dataset.filtro);

      opcao.classList.toggle("ativo", selecionado);
      opcao.setAttribute("aria-pressed", String(selecionado));
    });

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
  localSelecionado = local;
  const mapa = linkGoogleMaps(local);

  detalhe.innerHTML = `
    <h2>${local.icone} ${local.nome}</h2>
    <p><strong>${local.tipo}</strong> · ${local.endereco}</p>
    <p>${local.descricao}</p>

    <h3>Recursos de acessibilidade</h3>
    ${local.acessibilidade.length
      ? `<ul>${local.acessibilidade
        .map((recurso) => `<li>${nomesRecursos[recurso]}</li>`)
        .join("")}</ul>`
      : '<p class="aviso-acessibilidade">Ainda não há informações verificadas. Confirme com o local antes de ir.</p>'}
    ${local.fonte
      ? `<p class="fonte-local">Endereço consultado em <a href="${local.fonteUrl}" target="_blank" rel="noopener noreferrer">${local.fonte}</a>.</p>`
      : ""}

    <div class="acoes-detalhe">
      <button class="acao-detalhe principal" type="button" data-acao="compartilhar">
        Compartilhar
      </button>
      <a class="acao-detalhe" href="${mapa}" target="_blank" rel="noopener noreferrer">
        Abrir no Google Maps
      </a>
    </div>
  `;

  modal.showModal();
});

detalhe.addEventListener("click", async (evento) => {
  const botao = evento.target.closest('[data-acao="compartilhar"]');

  if (!botao || !localSelecionado) return;

  const mapa = linkGoogleMaps(localSelecionado);
  const texto = `${localSelecionado.nome}\n${localSelecionado.tipo} · ${localSelecionado.endereco}\n${mapa}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: localSelecionado.nome,
        text: `${localSelecionado.tipo} · ${localSelecionado.endereco}`,
        url: mapa
      });
      return;
    } catch (erro) {
      if (erro.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(texto);
    alert("Informações do local copiadas.");
  } catch {
    window.prompt("Copie as informações do local:", texto);
  }
});

document.querySelector(".fechar").addEventListener("click", () => {
  modal.close();
});

document.querySelector("#sugerir").addEventListener("click", () => {
  alert("Em uma versão completa, este botão abriria o formulário de cadastro de um novo local.");
});

mostrarLocais();