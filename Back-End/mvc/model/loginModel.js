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

    async logar(emailU, senhaU) {
        const query = await this.#db.selectUsuarioLogin(emailU, senhaU);
    
        if (query.length > 0) {
            return query[0].id_usuario; // Retorna o `id_usuario` se o login for bem-sucedido
        } else {
            return null; // Retorna `null` se as credenciais forem inválidas
        }
    }

    async buscarDadosUsuario(userId) {
        const query = await this.#db.selectUsuarioId(userId);
        return query;
    }

}

module.exports = LoginDAO