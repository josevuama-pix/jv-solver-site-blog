const posts = [
  {
    id: 1,
    category: "Tecnologia",
    icon: "fa-code",
    title: "Por onde começar a aprender programação?",
    excerpt: "Um guia simples para quem está a dar os primeiros passos no mundo da programação.",
    date: "09 Set 2026",
    body: `
      <p>Começar programação pode parecer confuso porque existem muitas linguagens, ferramentas e áreas.</p>
      <p>O melhor caminho é começar pelos fundamentos: lógica de programação, HTML, CSS e JavaScript para compreender como a web funciona.</p>
      <p>Depois, escolha uma direcção de acordo com o seu objectivo e construa pequenos projectos. A prática transforma conhecimento em competência.</p>
    `
  },
  {
    id: 2,
    category: "Design",
    icon: "fa-pen-nib",
    title: "Design bonito não é suficiente",
    excerpt: "Entenda por que um bom design precisa comunicar uma mensagem e servir um objectivo.",
    date: "06 Set 2026",
    body: `
      <p>Uma peça visual pode ser bonita e ainda assim não funcionar.</p>
      <p>Antes de escolher cores, fontes e elementos, é importante saber quem vai receber a mensagem, qual é o objectivo e qual acção se espera do público.</p>
      <p>É essa combinação entre estética, clareza e estratégia que transforma design em comunicação.</p>
    `
  },
  {
    id: 3,
    category: "Marketing",
    icon: "fa-bullhorn",
    title: "O que uma marca precisa antes de anunciar?",
    excerpt: "Antes de investir em divulgação, existem elementos que ajudam uma marca a comunicar melhor.",
    date: "03 Set 2026",
    body: `
      <p>Marketing não começa necessariamente com um anúncio.</p>
      <p>Uma marca precisa saber o que oferece, para quem oferece e por que alguém deveria escolher a sua solução.</p>
      <p>Identidade, posicionamento, conteúdo e estratégia devem trabalhar juntos para que a divulgação tenha mais sentido.</p>
    `
  },
  {
    id: 4,
    category: "Estudos",
    icon: "fa-graduation-cap",
    title: "Como organizar um trabalho académico",
    excerpt: "Uma estrutura simples pode tornar a pesquisa, escrita e apresentação muito mais fáceis.",
    date: "30 Ago 2026",
    body: `
      <p>Comece pelo enunciado. Identifique exactamente o que o professor pediu antes de pesquisar.</p>
      <p>Depois organize o conteúdo em introdução, desenvolvimento, conclusão e referências, quando aplicável.</p>
      <p>Por fim, reveja o trabalho e prepare a apresentação com foco nas ideias principais.</p>
    `
  },
  {
    id: 5,
    category: "Negócios",
    icon: "fa-lightbulb",
    title: "Você precisa mesmo daquele serviço?",
    excerpt: "Nem sempre aquilo que o cliente pede é aquilo que resolve o problema.",
    date: "27 Ago 2026",
    body: `
      <p>Um cliente pode chegar a pedir um flyer, um website ou uma campanha porque acredita que essa é a solução.</p>
      <p>Mas uma boa consultoria procura entender o objectivo por trás do pedido.</p>
      <p>Às vezes a melhor solução é um serviço. Outras vezes é uma combinação de várias áreas.</p>
    `
  },
  {
    id: 6,
    category: "Tecnologia",
    icon: "fa-globe",
    title: "O que um website pode fazer por um negócio?",
    excerpt: "Um website pode funcionar como ponto central da presença digital de uma marca.",
    date: "24 Ago 2026",
    body: `
      <p>Um website pode apresentar serviços, facilitar o contacto, fortalecer credibilidade e organizar informações.</p>
      <p>Mas o site deve nascer de um objectivo claro. Não basta ter uma página online: ela precisa servir as pessoas que a utilizam.</p>
    `
  }
];

const postGrid = document.getElementById("postGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category");

let currentCategory = "Todos";

function renderPosts() {
  const term = searchInput.value.trim().toLowerCase();

  const filtered = posts.filter(post => {
    const categoryMatch =
      currentCategory === "Todos" || post.category === currentCategory;

    const text = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
    const searchMatch = text.includes(term);

    return categoryMatch && searchMatch;
  });

  postGrid.innerHTML = filtered.map(post => `
    <article class="post">
      <div class="post-cover">
        <i class="fa-solid ${post.icon}"></i>
      </div>
      <div class="post-content">
        <span class="post-category">${post.category}</span>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <div class="post-footer">
          <span>${post.date}</span>
          <button class="read-post" data-id="${post.id}">
            Ler artigo <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </article>
  `).join("");

  emptyState.style.display = filtered.length ? "none" : "block";

  document.querySelectorAll(".read-post").forEach(button => {
    button.addEventListener("click", () => openPost(Number(button.dataset.id)));
  });
}

function openPost(id) {
  const post = posts.find(item => item.id === id);
  if (!post) return;

  document.getElementById("modalCategory").textContent = post.category;
  document.getElementById("modalTitle").textContent = post.title;
  document.getElementById("modalDate").textContent = post.date;
  document.getElementById("modalBody").innerHTML = post.body;

  const modal = document.getElementById("postModal");
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("postModal");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    currentCategory = button.dataset.category;
    renderPosts();
  });
});

searchInput.addEventListener("input", renderPosts);

document.querySelectorAll('[data-close="modal"]').forEach(element => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

renderPosts();
