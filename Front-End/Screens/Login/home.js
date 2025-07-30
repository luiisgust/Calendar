import { BASE_URL } from '../../config/config.js';

let dataReferencia = new Date();
let diaSelecionado = new Date();
let docentesApi = [];
let eventosCache = [];

const nomeExibicao = document.getElementById('nomeExibicao');
const logoutBtn = document.getElementById('logout-btn');
const calendarioPrincipal = document.getElementById("calendarioPrincipal");
const diasCalendario = document.getElementById("diasCalendario");
const mesAno = document.getElementById("mesAno");
const btnMesAnterior = document.getElementById("mes-anterior");
const btnMesProximo = document.getElementById("mes-proximo");
const docenteSelect = document.getElementById("docenteSelect");
const infoDocente = document.getElementById("info-docente");

// UTILITÁRIOS DE DATA
function parseDataBanco(valor) {
  if (!valor || typeof valor !== "number") return null;
  const str = valor.toString();
  const dia = parseInt(str.slice(0, 2));
  const mes = parseInt(str.slice(2, 4)) - 1; // mês começa em zero
  const ano = parseInt(str.slice(4));
  const data = new Date(ano, mes, dia);

  return isNaN(data.getTime()) ? null : data;
}


function criarDateCompleto(dataInicio, horaInicio) {
  const [h, m] = horaInicio.split(":"), data = parseDataBanco(dataInicio);
  data.setHours(h, m);
  return data;
}

function calcularFim(dataInicio, cargaHoraria) {
  const fim = new Date(dataInicio);
  fim.setHours(fim.getHours() + cargaHoraria);
  return fim;
}

// VALIDAÇÃO DE SESSÃO
async function validarSessao() {
  try {
    const res = await fetch(`${BASE_URL}/conta`, { method: 'GET', credentials: 'include' });
    if (!res.ok) throw new Error();
    await res.json();
  } catch (err) {
    console.error('Sessão inválida:', err);
    window.location.href = '/login';
  }
}

// LOGOUT
logoutBtn.addEventListener('click', async () => {
  try {
    const res = await fetch(`${BASE_URL}/logout`, { method: 'POST', credentials: 'include' });
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    const data = await res.json();
    alert(data.success ? data.message : 'Erro ao fazer logout.');
    if (data.success) window.location.href = '/login';
  } catch (err) {
    console.error('Erro ao fazer logout:', err);
    alert('Erro. Tente novamente mais tarde.');
  }
});

// NAVEGAÇÃO ENTRE PÁGINAS
function configurarNavegacao(id, rota, caminho) {
  const botao = document.getElementById(id);
  botao?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/${rota}`, { method: 'GET', credentials: 'include' });
      if (!res.ok) throw new Error(`Erro: ${res.status}`);
      await res.json();
      window.location.href = caminho;
    } catch (err) {
      console.error(`Falha ao acessar ${rota}:`, err);
    }
  });
}

[
  ['agendamento', 'agendamento', '/agendamentos'],
  ['ambiente', 'ambiente', '/ambientes'],
  ['curso', 'curso', '/cursos'],
  ['docente', 'docente', '/docentes'],
  ['turma', 'turma', '/turmas']
].forEach(([id, rota, caminho]) => configurarNavegacao(id, rota, caminho));

// SELECT DE DOCENTES
async function preencherSelectDocentes() {
  const elDocente = document.querySelector("#docenteSelect");
  try {
    const res = await fetch("http://localhost:3000/docente");
    const docentes = await res.json();
    elDocente.innerHTML = docentes
      .map(docente => `<option value="${docente.id}">${docente.exibicaoD}</option>`)
      .join("");
  } catch (err) {
    console.error("Erro ao carregar docentes:", err);
  }
}

validarSessao();
init();

function init() {
  atualizarMiniCalendario();
  gerarGradeSemana();
  preencherSelectDocentes();
  registrarEventos();
  carregarEventosAPI();
}

function registrarEventos() {
  [btnMesAnterior, btnMesProximo].forEach((btn, i) =>
    btn.addEventListener("click", () => mudarMes(i === 0 ? -1 : 1))
  );
  docenteSelect.addEventListener("change", verEscalaSelect);
}

function atualizarMiniCalendario() {
  const ano = dataReferencia.getFullYear();
  const mes = dataReferencia.getMonth();
  const hoje = new Date();
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();

  mesAno.textContent = dataReferencia.toLocaleDateString('pt-br', { month: 'long', year: 'numeric' });
  diasCalendario.innerHTML = `<span class="inativo"></span>`.repeat(primeiroDia);

  for (let d = 1; d <= ultimoDia; d++) {
    const diaData = new Date(ano, mes, d);
    const classe = diaData.toDateString() === diaSelecionado.toDateString()
      ? "selected"
      : diaData.toDateString() === hoje.toDateString()
        ? "today"
        : "";

    const span = document.createElement("span");
    span.textContent = d;
    span.className = classe;
    span.addEventListener("click", () => selecionarDia(d));
    diasCalendario.appendChild(span);
  }
}

function selecionarDia(dia) {
  diaSelecionado.setFullYear(dataReferencia.getFullYear(), dataReferencia.getMonth(), dia);
  dataReferencia = new Date(diaSelecionado);
  gerarGradeSemana();
  atualizarMiniCalendario();
  reposicionarEventosNaGrade();
}

function gerarGradeSemana() {
  const hoje = new Date();
  const nomesDias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const inicioSemana = new Date(diaSelecionado);
  inicioSemana.setDate(inicioSemana.getDate() - diaSelecionado.getDay());

  calendarioPrincipal.innerHTML = `<div class="grade-inicial"></div>`;

  for (let i = 0; i < 7; i++) {
    const diaAtual = new Date(inicioSemana);
    diaAtual.setDate(inicioSemana.getDate() + i);

    const classe = diaAtual.toDateString() === diaSelecionado.toDateString()
      ? "selected"
      : diaAtual.toDateString() === hoje.toDateString()
        ? "today"
        : "";

    calendarioPrincipal.innerHTML += `
      <div class="day-header ${classe}">
        ${nomesDias[i]}<br>${diaAtual.getDate().toString().padStart(2, "0")}
      </div>`;
  }

  for (let h = 7; h <= 23; h++) {
    calendarioPrincipal.innerHTML += `<div class="hour">${h}:00</div>`;
    for (let d = 0; d < 7; d++) {
      const bloco = document.createElement("div");
      bloco.className = "bloco-dia";
      bloco.dataset.dia = d;
      calendarioPrincipal.appendChild(bloco);
    }
  }
}

function horaToDecimal(horaStr) {
  const [h, m] = horaStr.split(":").map(Number);
  return h + m / 60;
}

function encurtarTexto(texto, limite = 22) {
  return texto.length > limite ? texto.slice(0, limite) + "…" : texto;
}

function diaDaSemana(dataNum) {
  const [dia, mes, ano] = [
    dataNum.toString().slice(0, 2),
    dataNum.toString().slice(2, 4),
    dataNum.toString().slice(4)
  ].map(Number);
  return new Date(ano, mes - 1, dia).getDay();
}

function renderizarBloco(bloco, dados) {
  const eventoEl = document.createElement("div");
  eventoEl.className = "evento";
  eventoEl.title = `${dados.nomeCurso} | Turma: ${dados.nomeTurma} | Docente: ${dados.nomeDocente} | Sala: ${dados.nomeSala}`;
  eventoEl.innerHTML = `
    <strong>${encurtarTexto(dados.nomeCurso)}</strong><br>
    Turma: ${encurtarTexto(dados.nomeTurma)}<br>
    Docente: ${encurtarTexto(dados.nomeDocente)}<br>
    Sala: ${encurtarTexto(dados.nomeSala)}
  `;
  bloco.appendChild(eventoEl);
  bloco.classList.add("ocupado");
}

function posicionarEventoEmPeriodo(dados) {
  const inicio = parseDataBanco(dados.dataInicio);
  const fim = parseDataBanco(dados.dataFinal);
  const horaInicioDecimal = horaToDecimal(dados.horaInicio || "08:00:00");
  const carga = Math.min(dados.cargaHoraria || 4, 16);
  const indexInicial = Math.round(horaInicioDecimal - 7);

  if (!(fim instanceof Date) || fim < inicio) {
    console.warn("Data de término inválida para o evento:", dados);
    return;
  }

  // 🔒 Limites da semana visível
  const semanaInicio = new Date(diaSelecionado);
  semanaInicio.setDate(semanaInicio.getDate() - diaSelecionado.getDay());

  const semanaFim = new Date(semanaInicio);
  semanaFim.setDate(semanaInicio.getDate() + 6); // sábado

  for (let data = new Date(inicio); data <= fim; data.setDate(data.getDate() + 1)) {
    // 📅 Só desenha se o dia estiver visível na grade atual
    if (data < semanaInicio || data > semanaFim) continue;

    const diaSemana = data.getDay();
    if (diaSemana === 0 || diaSemana === 6) continue;

    const blocosDia = Array.from(calendarioPrincipal.querySelectorAll(`.bloco-dia[data-dia="${diaSemana}"]`));
    if (!blocosDia.length || indexInicial + carga > blocosDia.length) continue;

    for (let i = 0; i < carga; i++) {
      const bloco = blocosDia[indexInicial + i];
      if (bloco) renderizarBloco(bloco, dados);
    }
  }
}



function renderizarBlocoComAltura(bloco, dados, carga) {
  const eventoEl = document.createElement("div");
  eventoEl.className = "evento";
  eventoEl.style.height = `${carga * 100}%`; // assume cada bloco tem height de 100%
  eventoEl.title = `${dados.nomeCurso} | Turma: ${dados.nomeTurma} | Docente: ${dados.nomeDocente} | Sala: ${dados.nomeSala}`;
  eventoEl.innerHTML = `
    <strong>${encurtarTexto(dados.nomeCurso)}</strong><br>
    Turma: ${encurtarTexto(dados.nomeTurma)}<br>
    Docente: ${encurtarTexto(dados.nomeDocente)}<br>
    Sala: ${encurtarTexto(dados.nomeSala)}
  `;
  bloco.appendChild(eventoEl);
}


function verEscalaSelect() {
  const nome = docenteSelect.value;
  const docente = docentesApi.find(d => d.nome === nome);
  if (!docente) return;

  const dataObj = new Date(docente.escala);
  infoDocente.innerText = `${docente.nome} está escalado em ${dataObj.toLocaleDateString('pt-br', { weekday: 'long', day: '2-digit', month: 'long' })}.`;
  infoDocente.style.display = "block";

  document.querySelectorAll(".calendar-semana .highlight-docente")
    .forEach(el => el.classList.remove("highlight-docente"));

  const inicioSemana = new Date(diaSelecionado);
  inicioSemana.setDate(inicioSemana.getDate() - diaSelecionado.getDay());

  for (let i = 0; i < 7; i++) {
    const diaAtual = new Date(inicioSemana);
    diaAtual.setDate(inicioSemana.getDate() + i);
    if (diaAtual.toDateString() === dataObj.toDateString()) {
      calendarioPrincipal.querySelectorAll(`[data-dia="${i}"]`)
        .forEach(el => el.classList.add("highlight-docente"));
      break;
    }
  }
}

function mudarMes(valor) {
  dataReferencia.setMonth(dataReferencia.getMonth() + valor);
  atualizarMiniCalendario();
}

function carregarEventosAPI() {
  fetch("http://localhost:3000/event/2")
    .then(res => res.json())
    .then(evento => {
      eventosCache = [evento];
      posicionarEventoEmPeriodo(evento);
    })
    .catch(err => console.error("Erro ao carregar eventos:", err));
}

function reposicionarEventosNaGrade() {
  if (!eventosCache.length) return console.warn("Nenhum evento no cache");
  eventosCache.forEach(posicionarEventoEmPeriodo);
}

function abrirModalEdicao(evento) {
  const novaDisciplina = prompt("Editar disciplina:", evento.disciplina);
  if (!novaDisciplina) return;
  evento.disciplina = novaDisciplina;
  posicionarEventoEmPeriodo(evento);
  salvarAlteracaoNoBackend(evento);
}

function salvarAlteracaoNoBackend(evento) {
  fetch(`http://localhost:3000/event/${evento.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(evento)
  })
    .then(res => res.json())
    .then(data => console.log("Evento atualizado:", data))
    .catch(err => console.error("Erro ao salvar:", err));
}
