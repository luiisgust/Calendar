import {BASE_URL} from '../../../config/config.js'

document.addEventListener('DOMContentLoaded', () => {
  const dynamicScript = document.createElement('script');
  dynamicScript.type = `module`
  dynamicScript.src = `./agendamento.js?ver=${Date.now()}`;
  document.body.appendChild(dynamicScript);
});


document.addEventListener('DOMContentLoaded', () => {
    // Evento do botão de voltar
    document.getElementById('back-btn').addEventListener('click', () => {
        // Volta para a página anterior
        window.history.back();
    });
});

async function carregarMissao() {
  const Agendamento = document.querySelector("#listagem");

  // Busca todos os agendamentos
  const dados = await fetch(`${BASE_URL}/agendamento`);
  const agendamentos = await dados.json();

  // Processa cada agendamento
  for (let agendado of agendamentos) {
    // Busca as informações das chaves estrangeiras
    const [turma, docente, ambiente, periodo] = await Promise.all([
      fetch(`${BASE_URL}/turma/${agendado.turmaA}`).then(res => res.json()),
      fetch(`${BASE_URL}/docente/${agendado.docenteA}`).then(res => res.json()),
      fetch(`${BASE_URL}/ambiente/${agendado.ambienteA}`).then(res => res.json()),
      fetch(`${BASE_URL}/periodo/${agendado.periodoA}`).then(res => res.json())
    ]);

    console.log(turma, docente, ambiente, periodo);

    // Adiciona os dados ao HTML
    Agendamento.innerHTML += `
      <div class="row">
        <div class="column">${turma ? turma.nomeT : 'Sem turma'}</div>
        <div class="column">${docente ? docente.exibicaoD : 'Sem docente'}</div>
        <div class="column">${ambiente ? ambiente.nomeA : 'Sem ambiente'}</div>
        <div class="column">${periodo ? periodo.nome : 'Sem período'}</div>
        <div class="column">${agendado.dataA}</div>
        <div class="column">
          <button onclick="atualizar(${agendado.id})" class="ui inverted primary button">
            <i class="pencil alternate icon"></i>
          </button>
        </div>
        <div class="column">
          <button onclick="apagar(${agendado.id})" class="ui inverted red button">
            <i class="trash alternate outline icon"></i>
          </button>
        </div>
      </div>
    `;
  }
}
  

  async function apagar(id){     

    const dados = await fetch(`${BASE_URL}/agendamento/`+id, { method: 'DELETE' })
    const json = await dados.json()
    let agendado = await json
          
    location.reload()
  }

  function atualizar(id){
    location.href = "/altermissao/"+id
  }

  carregarMissao()