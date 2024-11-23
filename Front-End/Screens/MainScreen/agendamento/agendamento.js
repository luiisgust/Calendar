document.addEventListener('DOMContentLoaded', () => {
    // Evento do botão de voltar
    document.getElementById('back-btn').addEventListener('click', () => {
        // Volta para a página anterior
        window.history.back();
    });
});


let Agendamento = document.querySelector("#listagem")

    const dados = await fetch('http://192.168.0.135:3000/agendamento')
    const json = await dados.json()
    let agendamentos = await json

    for(let agendados of agendamentos){
      console.log(agendados)
      Agendamento.innerHTML +=`
      <div class="row">
            <div class="column">${agendados.nome}</div>
            <div class="col border-end border-danger text-center desc">${missao.desc}</div>
            <div class="col border-end border-danger text-center">${missao.recompensa}</div>
            <div class="col border-start text-center"><button onclick="atualizar(${missao.id})" class="btn btn-success"><i class="bi bi-arrow-repeat"></i></button></div>
            <div class="col border-start text-center"><button onclick="apagar(${missao.id})" class="btn btn-danger"><i class="bi bi-trash"></i></button></div>
          </div>
      `
    } 
  

  async function apagar(id){     

    const dados = await fetch('http://localhost:3000/missao/'+id, { method: 'DELETE' })
    const json = await dados.json()
    let missoes = await json
          
    location.reload()
  }

  function atualizar(id){
    location.href = "/altermissao/"+id
  }

  carregarMissao()