const Docente = require('../model/docenteModel')

module.exports = (app) => {


    // Todos os gets
    app.get("/docente", async (req, res) => {        
        const docente = new Docente()
        
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await docente.consultarTodos())        
    })
        
    app.get("/docente/:id", async (req, res) => {
        const docente = new Docente()
        const status = await docente.consultarUm(req.params.id)

        res.json(
            status
        )
    })

   
    // Todos os post
    app.post('/registerdocente', async (req, res) => {


        console.log(req.body)
        const docente = new Docente();
        const { 
            id: id,
            nomeD: nomeD, 
            sobrenomeD: sobrenomeD,
            exibicaoD: exibicaoD  } = req.body;

        res.setHeader("Access-Control-Allow-Origin","*")
 
        let status;

        if(!id){
            status = await docente.registrarDocente(nomeD, sobrenomeD, exibicaoD)
            res.json({isAuth: status})
        }
        else{
            status = await docente.att(id, nomeD, sobrenomeD, exibicaoD)
        }   

       
        // res.redirect("/missao")

    })


    // Delete
    app.delete("/docente/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const docente = new Docente()

        const status = await docente.del(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/docente/:id", async (req, res) =>{
        const docente = new Docente()
        
        const {
            nomeD,
            sobrenomeD,
            exibicaoD,
            id
        } = req.body;

        console.log({nomeD, sobrenomeD, exibicaoD, id})
      
        if(id == req.params.id){
          const r =  await docente.att(nomeD, sobrenomeD, exibicaoD, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }         
    })
 
    
}