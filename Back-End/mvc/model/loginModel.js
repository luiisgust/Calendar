var DataBaseMySQL = require('../../DataBase/database')



class Login {

   #emailU
   #senhaU
   
   constructor(emailU, senhaU) {
        this.#emailU = emailU
        this.#senhaU = senhaU
   }


   get emailU(){
    return this.#emailU
   }
   set emailU(value){
    this.#emailU = value
   }

   get senhaU(){
    return this.#senhaU
   }
   set senhaU(value){
    this.#senhaU = value
   }

   permitirEntrada(dados){
    if(dados.length > 0){
        return true
    }
    else{
        return false
    }
}

   toJson(){

        return{
            "emailU": this.#emailU,
            "senhaU": this.#senhaU
        }

   }
}

class LoginDAO {

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async logar(emailU, senhaU){

        const login = new Login(emailU, senhaU)

        const query = await this.#db.selectUsuarioLogin(login.emailU, login.senhaU)
       

        return login.permitirEntrada(query[0])
    }

}

module.exports = LoginDAO