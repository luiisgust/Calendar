const Turma = require('../model/turmaModel')

module.exports = (app) => {


    // Todos os gets
    app.get("/turma", async (req, res) => {        
        const turma = new Turma()
        
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await turma.consultarTodos())        
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
    app.post('/registerturma', async (req, res) => {


        console.log(req.body)
        const turma = new Turma();
        const { 
            id: id,
            nomeT: nomeT,
            docenteP: docenteP,
            docenteA: docenteA,
            cursoT: cursoT,
            fatorT: fatorT } = req.body;

        res.setHeader("Access-Control-Allow-Origin","*")
 
        let status;

        if(!id){
            status = await turma.registrarturma(nomeT, docenteP, docenteA, cursoT, fatorT)
            res.json({isAuth: status})
        }
        else{
            status = await turma.att(id, nomeT, docenteP, docenteA, cursoT, fatorT)
        }   

       
        // res.redirect("/missao")

    })


    // Delete
    app.delete("/turma/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const turma = new Turma()

        const status = await turma.del(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/turma/:id", async (req, res) =>{
        const turma = new Turma()
        
        const {
            nomeT,
            docenteP,
            docenteA,
            cursoT,
            fatorT,
            id
        } = req.body;

        console.log({nomeT, docenteP, docenteA, cursoT, fatorT, id})
      
        if(id == req.params.id){
          const r =  await turma.att(nomeT, docenteP, docenteA, cursoT, fatorT, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }         
    })
 
    
}