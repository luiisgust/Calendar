const Docente = require('../model/docenteModel')

module.exports = (app) => {


    // Todos os gets
    app.get("/listdocente", async (req, res) => {        
        const docente = new Docente()
        
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await docente.consultarTodos())        
    })
        
    // app.get("/missao", (req, res) => {
    //     res.render("Missao/listmissoes")
    // })


    // app.get("/altermissao/:id", async (req, res) =>{
        
    //     const missao = new MissaoDAO()        
    //     const r = await missao.consultarUm(req.params.id)
    //     console.log(r)
    //     res.render('Missao/altermissao', { r })
    // })

   
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
            status = await docente.atualizar(id, nomeD, sobrenomeD, exibicaoD)
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