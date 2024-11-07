const Login = require('../model/loginModel')


module.exports = (app) => {


    // Todos os gets
    app.get("/status", async (req, res) =>{
        res.json({status:true})
    })


    // Todos os post
    app.post('/logar', async (req, res) => {
        // console.log(req)
        

            console.log(req.body)
            const { 
            emailU, 
            senhaU } = req.body;
                
            let permitido = await new Login().logar(emailU, senhaU);

             console.log(emailU, senhaU)
       
            res.json({isAuth: permitido})   
           
    })
     
}