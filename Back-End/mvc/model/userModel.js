const DataBaseMySQL = require('../../DataBase/database')

class User {

    #id
    #nomeU
    #emailU
    #senhaU

    constructor(nome, email, senha){
        this.#nomeU = nome
        this.#emailU = email
        this.#senhaU = senha
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get nome() {
        return this.#nomeU
    }
    set nome(value) {
        this.#nomeU = value
    }

    get email() {
        return this.#emailU
    }
    set email(value) {
        this.#emailU = value
    }

    get senha() {
        return this.#senhaU
    }
    set senha(value) {
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

        return {
            "id": this.#id,
            "nome": this.#nomeU,
            "email": this.#emailU,
            "senha": this.#senhaU
        }
    }
}

class UserDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async logar(email, senha){

        const user = new User(email, senha)

        const query = await this.#db.selectUsuario(user.email, user.senha)
       

        return user.permitirEntrada(query[0])
    }
}

module.exports = UserDAO