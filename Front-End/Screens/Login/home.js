import {BASE_URL} from '../../config/config.js'

document.addEventListener('DOMContentLoaded', () => {
    const dynamicScript = document.createElement('script');
    dynamicScript.type = `module`
    dynamicScript.src = `home.js?ver=${Date.now()}`;
    document.body.appendChild(dynamicScript);
  });

document.addEventListener('DOMContentLoaded', () => {
    // Busca as informações do usuário
    fetch(`${BASE_URL}/conta`, {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Erro ao acessar a conta');
        }
    }).then(data => {
        console.log(data);
    })

    .catch(error => {
        document.getElementById('message').textContent = error.message;
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'POST', // Certifique-se de usar o método correto (conforme o servidor)
            credentials: 'include', // Inclui o cookie de sessão na requisição
        });

        if (!response.ok) {
            const text = await response.text(); // Captura resposta como texto para depuração
            console.error('Erro do servidor:', text);
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            alert(data.message); // Mensagem de sucesso (opcional)
            window.location.href = 'login.html'; // Redireciona para a página de login
        } else {
            console.error('Erro ao fazer logout:', data.message);
            alert('Erro ao fazer logout. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Ocorreu um erro ao fazer logout. Tente novamente mais tarde.');
    }
    });
});



document.getElementById('agendamento').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/agendamento`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de agendamento
        window.location.href = '../MainScreen/agendamento/agendamento.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});


document.getElementById('ambiente').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/ambiente`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de ambiente
        window.location.href = '../MainScreen/ambiente/ambiente.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});

document.getElementById('agendamento').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/agendamento`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de agendamento
        window.location.href = '../MainScreen/agendamento/agendamento.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});
document.getElementById('agendamento').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/agendamento`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de agendamento
        window.location.href = '../MainScreen/agendamento/agendamento.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});
document.getElementById('agendamento').addEventListener('click', async (event) => {
    event.preventDefault(); // Evita o redirecionamento
    try {
        const response = await fetch(`${BASE_URL}/agendamento`, {
            method: 'GET',
            credentials: 'include', // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // Redireciona para a página de agendamento
        window.location.href = '../MainScreen/agendamento/agendamento.html';
    } catch (error) {
        console.error('Erro ao fazer fetch:', error);
    }
});


// home.js (carregado como type="module")

// Referências principais
const calendarioPrincipal = document.getElementById("calendarioPrincipal");
const diasCalendario = document.getElementById("diasCalendario");
const mesAno = document.getElementById("mesAno");
const btnMesAnterior = document.getElementById("mes-anterior");
const btnMesProximo = document.getElementById("mes-proximo");
const docenteSelect = document.getElementById("docenteSelect");
const infoDocente = document.getElementById("info-docente");

let dataReferencia = new Date();
let diaSelecionado = new Date();

const docentesApi = [
  { nome: "Fulano", escala: "2025-07-23" },
  { nome: "Beltrano", escala: "2025-07-21" }
];

// Inicialização
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

function preencherSelectDocentes() {
  docentesApi.forEach(docente => {
    const option = document.createElement("option");
    option.value = docente.nome;
    option.textContent = docente.nome;
    docenteSelect.appendChild(option);
  });
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
