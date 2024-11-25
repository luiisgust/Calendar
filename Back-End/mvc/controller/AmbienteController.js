const Ambiente = require('../model/ambienteModel')

module.exports = (app) => {


    // Todos os gets
    app.get("/ambiente", async (req, res) => {        
        const ambiente = new Ambiente()
        
        res.json(await ambiente.consultarTodos())        
    })
        
    app.get("/agendamento/:id", async (req, res) => {
        const agendamento = new Agendamento()
        const status = await agendamento.consultarUm(req.params.id)

        res.json(
            [{...status}]
        )
    })

   
    // Todos os post
    app.post('/registerambiente', async (req, res) => {


        console.log(req.body)
        const ambiente = new Ambiente();
        const { 
            id: id,
            nomeA: nomeA } = req.body;

        res.setHeader("Access-Control-Allow-Origin","*")
 
        let status;

        if(!id){
            status = await ambiente.registrarAmbiente(nomeA)
            res.json({isAuth: status})
        }
        else{
            status = await ambiente.att(id, nomeA)
        }   

       
        // res.redirect("/missao")

    })


    // Delete
    app.delete("/ambiente/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const ambiente = new Ambiente()

        const status = await ambiente.del(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/ambiente/:id", async (req, res) =>{
        const ambiente = new Ambiente()
        
        const {
            nomeA,
            id
        } = req.body;

        console.log({nomeA, id})
      
        if(id == req.params.id){
          const r =  await ambiente.att(nomeA, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }         
    })
 
    
}