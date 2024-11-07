const User = require('../model/userModel')

module.exports = (app) => {


    // Todos os gets
    
    app.get("/usuario/:id", async (req, res) => {
        const user = new User()
        
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await user.consultarUm())
    })


    app.post('/cadastrouser', async (req, res) => {


        console.log(req.body)
        const user = new User();
        const { 
            id: id,
            nomeU: nomeU,
            emailU: emailU,
            senhaU: senhaU} = req.body;

        res.setHeader("Access-Control-Allow-Origin","*")
 
        let status;

        if(!id){
            status = await user.cadastro(nomeU, emailU, senhaU)
            res.json({isAuth: status})
        }
        else{
            status = await user.att(id, nomeU, emailU, senhaU)
        }   

       
        // res.redirect("/missao")

    })


    // Delete
    app.delete("/usuario/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const user = new User()

        const status = await user.del(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/usuario/:id", async (req, res) =>{
        const user = new User()
        
        const {
            nomeU,
            emailU,
            senhaU,
            id
        } = req.body;

        console.log({nomeU, emailU, senhaU, id})
      
        if(id == req.params.id){
          const r =  await user.att(nomeU, emailU, senhaU, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }         
    })


    
     
}