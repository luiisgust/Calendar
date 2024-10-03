const User = require('../model/userModel')

module.exports = (app) => {

    // Função para Logar
    app.get("/status", async (req, res) =>{
        res.json({status:true})
    })
    app.post('/logar', async (req, res) => {
        console.log(req)
        
            console.log(req.body)
            const { 
            email: email, 
            senha: senha } = req.body;
                
            let permitido = await new User().logar(email, senha);
            
    
            res.json({isAuth: permitido})   
        
    })


    // Todos os gets
    app.get("/listuser", async (req, res) => {        
        const user = new User()
        
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await user.consultarTodos())        
    })


    // Todos os post
    app.post('/registeruser', async (req, res) => {


        console.log(req.body)
        const user = new User();
        const { 
            id: id,
            nome: nome, 
            email: email,
            senha: senha  } = req.body;

        res.setHeader("Access-Control-Allow-Origin","*")
 
        let status;

        if(!id){
            status = await user.registrarUser(nome, email, senha)
            res.json({isAuth: status})
        }
        else{
            status = await user.att(id, nome, email, senha)
        }   

       
        // res.redirect("/...")

    })


    // Delete
    app.delete("/user/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const user = new User()

        const status = await user.del(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/user/:id", async (req, res) =>{
        const user = new User()
        
        const {
            nome,
            email,
            senha,
            id
        } = req.body;

        console.log({nome, email, senha, id})
      
        if(id == req.params.id){
          const r =  await user.att(nome, email, senha, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }         
    })
    
     
}