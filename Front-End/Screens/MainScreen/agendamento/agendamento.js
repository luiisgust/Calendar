import { BASE_URL } from "../../../config/config.js";

// Evento que carrega dinamicamente o script
document.addEventListener("DOMContentLoaded", () => {
  // Carrega os agendamentos
  carregarAgendamento();

  // Configura o evento do botão de voltar
  document.getElementById("back-btn").addEventListener("click", () => {
    window.history.back();
  });

  document.getElementById('logout-btn').addEventListener('click', async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST', // Certifique-se de usar o método correto (conforme o servidor)
        credentials: 'include', // Inclui o cookie de sessão na requisição
      });

      if (!response.ok) {
        const text = await response.text(); // Captura resposta como texto para depuração
        console.error('Erro do servidor:', text);
        console.error("Falha na comunicação com o servidor.")
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        alert(data.message); // Mensagem de sucesso (opcional)
        window.location.href = '/login'; // Redireciona para a página de login
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
  document.getElementById("agendar").addEventListener("click", () => {
    console.log("Redirecionando...");
    window.location.href = '/addagendamento';
  });
})


// Função para carregar agendamentos
async function carregarAgendamento() {
  const Agendamento = document.querySelector("#listagemA");
  Agendamento.innerHTML = "";

  // Adiciona os títulos fixos uma única vez
  Agendamento.innerHTML += `
    <div class="titulos row" style="color: white;">
      <h3 class="ui header column">Turma</h3>
      <h3 class="ui header column">Docente</h3>
      <h3 class="ui header column">Local</h3>
      <h3 class="ui header column">Período</h3>
      <h3 class="ui header column">Data de início</h3>
      <h3 class="ui header column">Atualizar</h3>
      <h3 class="ui header column">Apagar</h3>
    </div>
  `;
  const formatarData = (dataISO) => {
    if (!dataISO) return "Sem data";
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  try {
    const dados = await fetch(`${BASE_URL}/agendamento`);
    if (!dados.ok) {
      const texto = await dados.text();
      console.error("Erro na resposta de /agendamento:", dados.status, texto);
      return;
    }

    const contentType = dados.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const texto = await dados.text();
      console.error("Conteúdo inesperado de /agendamento:", texto);
      return;
    }

    const agendamentos = await dados.json();


    for (let agendado of agendamentos) {
      const turmaResp = await fetch(`${BASE_URL}/turma/${agendado.turmaA}`);
      const turma = turmaResp.ok ? await turmaResp.json() : null;

      const docenteResp = await fetch(`${BASE_URL}/docente/${agendado.docenteA}`);
      const docente = docenteResp.ok ? await docenteResp.json() : null;

      const ambienteResp = await fetch(`${BASE_URL}/ambiente/${agendado.ambienteA}`);
      const ambiente = ambienteResp.ok ? await ambienteResp.json() : null;

      const periodoResp = await fetch(`${BASE_URL}/periodo/${agendado.periodoA}`);
      const periodo = periodoResp.ok ? await periodoResp.json() : null;

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
    const confirmacao = confirm("Tem certeza que deseja deletar?");
    if (!confirmacao) return;

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
