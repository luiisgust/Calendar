import { BASE_URL } from '../../config/config.js'

let dataReferencia = new Date();
let diaSelecionado = new Date();
let docentesApi = [];

const nomeExibicao = document.getElementById('nomeExibicao');
const logoutBtn = document.getElementById('logout-btn');
const calendarioPrincipal = document.getElementById("calendarioPrincipal");
const diasCalendario = document.getElementById("diasCalendario");
const mesAno = document.getElementById("mesAno");
const btnMesAnterior = document.getElementById("mes-anterior");
const btnMesProximo = document.getElementById("mes-proximo");
const docenteSelect = document.getElementById("docenteSelect");
const infoDocente = document.getElementById("info-docente");


async function validarSessao() {
  try {
    const response = await fetch(`${BASE_URL}/conta`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) throw new Error('Sessão inválida');
    const data = await response.json();

    nomeExibicao.innerHTML = `
      <h4 class="ui header">Bem-vindo, ${data.nome || 'Usuário ' + data.userId} 👋</h4>
    `;
  } catch (error) {
    console.error('Sessão expirada ou inexistente:', error);
    window.location.href = '/login';
  }
}

logoutBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      alert(data.message);
      window.location.href = '/login';
    } else {
      alert('Erro ao fazer logout. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    alert('Ocorreu um erro ao fazer logout. Tente novamente mais tarde.');
  }
});


function configurarNavegacao(idBotao, rotaBackend, paginaHtml) {
  const botao = document.getElementById(idBotao);
  if (!botao) return;

  botao.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/${rotaBackend}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      const data = await response.json();
      console.log(`Dados de ${rotaBackend}:`, data);
      window.location.href = paginaHtml;
    } catch (error) {
      console.error(`Erro ao navegar para ${rotaBackend}:`, error);
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


async function preencherSelectDocentes() {
  try {
    const response = await fetch(`${BASE_URL}/docente`, {
      method: 'GET',
      credentials: 'include'
    });

    docentesApi = await response.json();

    docentesApi.forEach(docente => {
      const option = document.createElement("option");
      option.value = docente.nome;
      option.textContent = docente.nome;
      docenteSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao buscar docentes:', error);
  }
}


validarSessao();
init();

function init() {
  atualizarMiniCalendario();
  gerarGradeSemana();
  preencherSelectDocentes();
  registrarEventos();
}

// Adiciona os eventos de clique programaticamente
function registrarEventos() {
  btnMesAnterior.addEventListener("click", () => mudarMes(-1));
  btnMesProximo.addEventListener("click", () => mudarMes(1));
  docenteSelect.addEventListener("change", verEscalaSelect);
}

function selecionarDia(dia) {
  diaSelecionado.setFullYear(dataReferencia.getFullYear(), dataReferencia.getMonth(), dia);
  dataReferencia = new Date(diaSelecionado);
  gerarGradeSemana();
  atualizarMiniCalendario();
}

function atualizarMiniCalendario() {
  const ano = dataReferencia.getFullYear();
  const mes = dataReferencia.getMonth();
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();
  const hoje = new Date();

  mesAno.textContent = dataReferencia.toLocaleDateString('pt-br', {
    month: 'long',
    year: 'numeric'
  });

  diasCalendario.innerHTML = "";

  for (let i = 0; i < primeiroDia; i++) {
    diasCalendario.innerHTML += `<span class="inativo"></span>`;
  }

  for (let d = 1; d <= ultimoDia; d++) {
    const diaData = new Date(ano, mes, d);
    const isHoje = diaData.toDateString() === hoje.toDateString();
    const isSelecionado = diaData.toDateString() === diaSelecionado.toDateString();
    let classe = "";
    if (isSelecionado) classe = "selected";
    else if (isHoje) classe = "today";

    const span = document.createElement("span");
    span.textContent = d;
    span.className = classe;
    span.addEventListener("click", () => selecionarDia(d));
    diasCalendario.appendChild(span);
  }
}

function gerarGradeSemana() {
  const diaSemanaSelecionado = diaSelecionado.getDay();
  const inicioSemana = new Date(diaSelecionado);
  inicioSemana.setDate(diaSelecionado.getDate() - diaSemanaSelecionado);

  const nomesDias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const hoje = new Date();

  calendarioPrincipal.innerHTML = "<div></div>";

  for (let i = 0; i < 7; i++) {
    const diaAtual = new Date(inicioSemana);
    diaAtual.setDate(inicioSemana.getDate() + i);

    const isHoje = diaAtual.toDateString() === hoje.toDateString();
    const isSelecionado = diaAtual.toDateString() === diaSelecionado.toDateString();
    let classe = "";
    if (isSelecionado) classe = "selected";
    else if (isHoje) classe = "today";

    calendarioPrincipal.innerHTML += `
      <div class="day-header ${classe}">
        ${nomesDias[i]}<br>${diaAtual.getDate().toString().padStart(2, "0")}
      </div>`;
  }

  for (let h = 5; h <= 23; h++) {
    calendarioPrincipal.innerHTML += `<div class="hour">${h}:00</div>`;
    for (let i = 0; i < 7; i++) {
      calendarioPrincipal.innerHTML += `<div data-dia="${i}"></div>`;
    }
  }
}

function mudarMes(valor) {
  dataReferencia.setMonth(dataReferencia.getMonth() + valor);
  atualizarMiniCalendario();
}

function verEscalaSelect() {
  const nome = docenteSelect.value;
  const docente = docentesApi.find(d => d.nome === nome);
  if (!docente) return;

  const dataObj = new Date(docente.escala);

  infoDocente.innerText = `${docente.nome} está escalado em ${dataObj.toLocaleDateString('pt-br', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  })}.`;
  infoDocente.style.display = "block";

  document.querySelectorAll(".calendar-semana .highlight-docente").forEach(el => {
    el.classList.remove("highlight-docente");
  });

  const inicioSemana = new Date(diaSelecionado);
  inicioSemana.setDate(diaSelecionado.getDate() - diaSelecionado.getDay());

  for (let i = 0; i < 7; i++) {
    const diaAtual = new Date(inicioSemana);
    diaAtual.setDate(inicioSemana.getDate() + i);
    if (diaAtual.toDateString() === dataObj.toDateString()) {
      const blocos = calendarioPrincipal.querySelectorAll(`[data-dia="${i}"]`);
      blocos.forEach(el => el.classList.add("highlight-docente"));
      break;
    }
  }
}