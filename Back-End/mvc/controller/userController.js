const User = require('../model/userModel')

module.exports = (app) => {


    // Todos os gets
    
    app.get("/login", async (req, res) => {

    })
    app.get("/status", async (req, res) =>{
        res.json({status:true})
    })


    // Todos os post
    app.post('/logar', async (req, res) => {
        console.log(req)
        

            console.log(req.body)
            const { 
            email: email, 
            senha: senha } = req.body;
                
            let permitido = await new User().logar(email, senha);

             
       
            res.json({isAuth: permitido})   
           
    })
     
}