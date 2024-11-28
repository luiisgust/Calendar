import { BASE_URL } from "../../../config/config.js";

// Evento que carrega dinamicamente o script
document.addEventListener("DOMContentLoaded", () => {
  // Carrega o script agendamento.js dinamicamente
  const dynamicScript = document.createElement("script");
  dynamicScript.type = `module`;
  dynamicScript.src = `agendamento.js?ver=${Date.now()}`;
  document.body.appendChild(dynamicScript);

  // Carrega os agendamentos
  carregarMissao();

  // Configura o evento do botão de voltar
  const backButton = document.getElementById("back-btn");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.history.back();
    });
  } else {
    console.error("Botão 'back-btn' não encontrado no DOM.");
  }

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
            window.location.href = '../../Login/login.html'; // Redireciona para a página de login
        } else {
            console.error('Erro ao fazer logout:', data.message);
            alert('Erro ao fazer logout. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Ocorreu um erro ao fazer logout. Tente novamente mais tarde.');
    }
    });
  

  // Configura o evento do botão 'agendar'
  const agendarButton = document.getElementById("agendar");
  if (agendarButton) {
    agendarButton.addEventListener("click", async () => {
      console.log("Botão 'agendar' clicado, iniciando requisição...");

      try {
        const response = await fetch(`${BASE_URL}/addagendamento`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          const text = await response.text();
          console.error('Erro do servidor:', text);
          alert(`Erro HTTP! Status: ${response.status}`);
          return;
        }

        const data = await response.json();
        console.log("Resposta recebida:", data);

        if (data.success) {
          alert(data.message);
          console.log("Redirecionando para newagendamento.html");
          window.location.href = 'newagendamento.html';
        } else {
          console.error("Erro ao fazer agendamento:", data.message);
          alert('Erro para fazer novo agendamento. Tente novamente.');
        }
      } catch (error) {
        console.error("Erro ao fazer requisição:", error);
        alert('Ocorreu um erro ao fazer novo agendamento. Tente novamente mais tarde.');
      }
    });
  } else {
    console.error("Botão com ID 'agendar' não encontrado no DOM.");
  }
});

// Função para carregar agendamentos
async function carregarMissao() {
  const Agendamento = document.querySelector("#listagem");
  Agendamento.innerHTML = "";

  // Adiciona os títulos fixos uma única vez
  Agendamento.innerHTML += `
    <div class="titulos row">
      <h3 class="ui header column">Turma</h3>
      <h3 class="ui header column">Docente</h3>
      <h3 class="ui header column">Local</h3>
      <h3 class="ui header column">Período</h3>
      <h3 class="ui header column">Data de início</h3>
      <h3 class="ui header column">Atualizar</h3>
      <h3 class="ui header column">Apagar</h3>
    </div>
  `;

  try {
    const dados = await fetch(`${BASE_URL}/agendamento`);
    const agendamentos = await dados.json();

    for (let agendado of agendamentos) {
      const [turma, docente, ambiente, periodo] = await Promise.all([
        fetch(`${BASE_URL}/turma/${agendado.turmaA}`).then((res) => res.json()),
        fetch(`${BASE_URL}/docente/${agendado.docenteA}`).then((res) => res.json()),
        fetch(`${BASE_URL}/ambiente/${agendado.ambienteA}`).then((res) => res.json()),
        fetch(`${BASE_URL}/periodo/${agendado.periodoA}`).then((res) => res.json()),
      ]);

      const formatarData = (dataISO) => {
        if (!dataISO) return "Sem data";
        const data = new Date(dataISO);
        return data.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      };

      Agendamento.innerHTML += `
        <div class="row">
          <div class="column">${turma ? turma.nomeT : "Sem turma"}</div>
          <div class="column">${docente ? docente.exibicaoD : "Sem docente"}</div>
          <div class="column">${ambiente ? ambiente.nomeA : "Sem ambiente"}</div>
          <div class="column">${periodo ? periodo.nome : "Sem período"}</div>
          <div class="column">${formatarData(agendado.dataA)}</div>
          <div class="column">
            <button onclick="att(${agendado.id})" class="ui inverted primary button">
              <i class="pencil alternate icon"></i> Atualizar
            </button>
          </div>
          <div class="column">
            <button onclick="del(${agendado.id})" class="ui inverted red button">
              <i class="trash alternate outline icon"></i> Apagar
            </button>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error);
  }
}

// Função para deletar um item e atualizar a página
async function del(id) {
  try {
    const resposta = await fetch(`${BASE_URL}/agendamento/${id}`, { method: "DELETE" });

    if (resposta.ok) {
      alert("Agendamento deletado com sucesso!");
    } else {
      alert("Erro ao deletar o agendamento.");
    }
    location.reload(); // Atualiza a página após a exclusão
  } catch (error) {
    console.error("Erro ao deletar o agendamento:", error);
  }
}

// Função para redirecionar para a edição de um item
function att(id) {
  location.href = `/altermissao/${id}`;
}
