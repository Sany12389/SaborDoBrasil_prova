function comentar(input) {
  const texto = input.value.trim();
  if (texto === "") return;

  const ul = input.parentElement.querySelector('.comments');
  const li = document.createElement('li');
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
    <span class="comentario-texto">${texto}</span>
    <div class="avaliacao-estrelas ms-2">
      ${[1,2,3,4,5].map(i => `<i class="bi bi-star" data-star="${i}" onclick="avaliarEstrela(this)"></i>`).join('')}
    </div>
    <div>
      <button class="btn btn-sm btn-outline-primary me-1" onclick="editarComentario(this)">Editar</button>
      <button class="btn btn-sm btn-outline-danger" onclick="excluirComentario(this)">Excluir</button>
    </div>
  `;
  ul.appendChild(li);
  input.value = "";
}

let comentarioAtualUl = null;

// Função para abrir o modal e guardar a referência da lista de comentários
function abrirModalComentario(ulComentarios) {
  comentarioAtualUl = ulComentarios;
  document.getElementById('modalComentarioInput').value = '';
  const modal = new bootstrap.Modal(document.getElementById('modalComentario'));
  modal.show();
}

// Função chamada ao confirmar o comentário no modal
function confirmarComentarioModal() {
  const input = document.getElementById('modalComentarioInput');
  const texto = input.value.trim();
  if (texto === "" || !comentarioAtualUl) return;

  const li = document.createElement('li');
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
    <span class="comentario-texto">${texto}</span>
    <div class="avaliacao-estrelas ms-2">
      ${[1,2,3,4,5].map(i => `<i class="bi bi-star" data-star="${i}" onclick="avaliarEstrela(this)"></i>`).join('')}
    </div>
    <div>
      <button class="btn btn-sm btn-outline-primary me-1" onclick="editarComentario(this)">Editar</button>
      <button class="btn btn-sm btn-outline-danger" onclick="excluirComentario(this)">Excluir</button>
    </div>
  `;
  comentarioAtualUl.appendChild(li);
  input.value = "";
  comentarioAtualUl = null;
  bootstrap.Modal.getInstance(document.getElementById('modalComentario')).hide();
}

// Função de avaliação de estrelas (mantém igual)
function avaliarEstrela(estrela) {
  const estrelas = estrela.parentElement.querySelectorAll('i');
  const valor = parseInt(estrela.getAttribute('data-star'));
  estrelas.forEach((el, idx) => {
    if (idx < valor) {
      el.classList.add('bi-star-fill');
      el.classList.remove('bi-star');
    } else {
      el.classList.add('bi-star');
      el.classList.remove('bi-star-fill');
    }
  });
}