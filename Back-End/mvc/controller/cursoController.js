const Curso = require('../model/cursoModel')

module.exports = (app) => {


    // Todos os gets
    app.get("/curso", async (req, res) => {        
        const curso = new Curso()
        
        res.json(await curso.consultarTodos())        
    })
        
    app.get("/curso/:id", async (req, res) => {
        const curso = new Curso()
        const status = await curso.consultarUm(req.params.id)

        res.json(
            status
        )
    })

   
    // Todos os post
    app.post('/registercurso', async (req, res) => {


        console.log(req.body)
        const curso = new Curso();
        const { 
            id: id,
            nomeC: nomeC,
            cargaC: cargaC,
            dataI: dataI,
            dataF: dataF,
            horarioAulaC: horarioAulaC } = req.body;

        res.setHeader("Access-Control-Allow-Origin","*")
 
        let status;

        if(!id){
            status = await curso.registrarcurso(nomeC, cargaC, dataI, dataF, horarioAulaC)
            res.json({isAuth: status})
        }
        else{
            status = await curso.att(id, nomeC, cargaC, dataI, dataF, horarioAulaC)
        }   

       
        // res.redirect("/missao")

    })


    // Delete
    app.delete("/curso/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const curso = new Curso()

        const status = await curso.del(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/curso/:id", async (req, res) =>{
        const curso = new Curso()
        
        const {
            nomeC,
            cargaC,
            dataI,
            dataF,
            horarioAulaC,
            id
        } = req.body;

        console.log({nomeC, cargaC, dataI, dataF, horarioAulaC, id})
      
        if(id == req.params.id){
          const r =  await curso.att(nomeC, cargaC, dataI, dataF, horarioAulaC, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }         
    })
 
    
}