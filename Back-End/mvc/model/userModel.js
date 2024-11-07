const DataBaseMySQL = require('../../DataBase/database')

class User {

    #id
    #nomeU
    #emailU
    #senhaU

    constructor(nomeU, emailU, senhaU){
        this.#nomeU = nomeU
        this.#emailU = emailU
        this.#senhaU = senhaU
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get nomeU() {
        return this.#nomeU
    }
    set nomeU(value) {
        this.#nomeU = value
    }

    get emailU() {
        return this.#emailU
    }
    set emailU(value) {
        this.#emailU = value
    }

    get senhaU() {
        return this.#senhaU
    }
    set senhaU(value) {
        this.#senhaU = value
    }

    toJson(){

        return {
            "id": this.#id,
            "nomeU": this.#nomeU,
            "emailU": this.#emailU,
            "senhaU": this.#senhaU
        }
    }
}

class UserDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarUm(id){      

        const query = await this.#db.selectUsuarioId(id)

        
        const user = new User()

        if(query){
            user.id = query[0].id_usuario
            user.nomeU = query[0].nome_usuario
            user.emailU = query[0].email_usuario
            user.senhaU = query[0].senha_usuario
        }

 
        return user.toJson()
    }


    async cadastro(
        nomeU,
        emailU,
        senhaU){

         
            const user = new User(nomeU, emailU, senhaU);

            const sql = await this.#db.AddUsuario(user.toJson())

            return sql.insertId;
        }

    async del(id){
        const linhasAfetadas =  await this.#db.delUsuario(id)
        return linhasAfetadas.affectedRows
    }

    async att(nomeU, emailU, senhaU, id){
        const user = new User(nomeU, emailU, senhaU)
        user.id = id

        const r = await this.#db.upUsuario(
            user.nomeU,
            user.emailU,
            user.senhaU,
            user.id
        )

        return r.affectedRows;
    }

    
}

module.exports = UserDAO