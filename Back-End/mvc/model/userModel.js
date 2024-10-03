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

        const query = await this.#db.selectUsuarioLogin(user.email, user.senha)
       

        return user.permitirEntrada(query[0])
    }

    async consultarTodos(){

        let list_user = []

        const query = await this.#db.selectUsuario()

        for (let index = 0; index < query.length; index++) {

            const user = new User()

            user.id = query[index].id_usuario
            user.nome = query[index].nome_usuario
            user.email = query[index].email_usuario
            user.senha = query[index].senha_usuario

            list_user.push(user.toJson())     
        }


       
        return list_user
    }

    async consultarUm(id){      

        const query = await this.#db.selectUsuarioId(id)

        
        const user = new User()

        if(query){
            user.id = query[0].id_user
            user.nome = query[0].nome_usuario
            user.email = query[0].email_usuario
            user.senha = query[0].senha_usuario
        }

 
        return user.toJson()
    }


    async registrarUser(
        nome, 
        email,
        senha){

         
            const user = new User(nome, email, senha);

            const sql = await this.#db.AddUsuario(user.toJson())

            return sql.insertId;
        }

    async del(id){
        const linhasAfetadas =  await this.#db.delUsuario(id)
        return linhasAfetadas.affectedRows
    }

    async att(nome, email, senha, id){
        const user = new User(nome, email, senha)
        user.id = id

        const r = await this.#db.upUsuario(
            user.nome,
            user.email,
            user.senha,
            user.id
        )

        return r.affectedRows;
    }
}

module.exports = UserDAO