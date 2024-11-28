const Agendamento = require('../model/agendamentoModel')

module.exports = (app) => {


    // Todos os gets
    app.get("/agendamento", async (req, res) => {        
        const agendamento = new Agendamento()
        console.log('Requisição para /agendamento recebida');
        
        res.json(await agendamento.consultarTodos())        
    })
        
    app.get("/agendamento/:id", async (req, res) => {
        const agendamento = new Agendamento()
        const status = await agendamento.consultarUm(req.params.id)

        res.json(
            status
        )
    })
    app.get("/addagendamento", (req, res) => {
        res.render('newagendamento.html');
    })

   
    // Todos os post
    app.post('/registeragendamento', async (req, res) => {


        console.log(req.body)
        const agendamento = new Agendamento();
        const { 
            id: id,
            turmaA: turmaA,
            docenteA: docenteA,
            ambienteA: ambienteA,
            periodoA: periodoA,
            dataA: dataA } = req.body;

        
 
        let status;

        if(!id){
            status = await agendamento.registrarAgendamento(turmaA, docenteA, ambienteA, periodoA, dataA)
            res.json({isAuth: status})
        }
        else{
            status = await agendamento.att(id, turmaA, docenteA, ambienteA, periodoA, dataA)
        }   

       
        // res.redirect("/missao")

    })


    // Delete
    app.delete("/agendamento/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const agendamento = new Agendamento()

        const status = await agendamento.del(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/agendamento/:id", async (req, res) =>{
        const agendamento = new Agendamento()
        
        const {
            turmaA,
            docenteA,
            ambienteA,
            periodoA,
            dataA,
            id
        } = req.body;

        console.log({turmaA, docenteA, ambienteA, periodoA, dataA, id})
      
        if(id == req.params.id){
          const r =  await agendamento.att(turmaA, docenteA, ambienteA, periodoA, dataA, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }         
    })
 
    
}