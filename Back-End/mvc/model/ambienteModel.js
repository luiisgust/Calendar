const DataBaseMySQL = require('../../DataBase/database')

class Ambiente {

    #id
    #nomeA

    constructor(nomeA){
        this.#nomeA = nomeA
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get nomeA() {
        return this.#nomeA
    }
    set nomeA(value) {
        this.#nomeA = value
    }


    toJson(){

        return {
            "id": this.#id,
            "nomeA": this.#nomeA
        }
    }
}

class AmbienteDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_ambiente = []

        const query = await this.#db.selectAmbiente()

        for (let index = 0; index < query.length; index++) {

            const ambiente = new Ambiente()

            ambiente.id = query[index].id_ambiente
            ambiente.nomeA = query[index].nome_ambiente

            list_ambiente.push(ambiente.toJson())     
        }


       
        return list_ambiente
    }

    async consultarUm(id){      

        const query = await this.#db.selectAmbienteId(id)

        
        const ambiente = new Ambiente()

        if(query){
            ambiente.id = query[0].id_ambiente
            ambiente.nomeA = query[0].nome_ambiente
        }

 
        return ambiente.toJson()
    }


    async registrarAmbiente(
        nomeA){

         
            const ambiente = new Ambiente(nomeA);

            const sql = await this.#db.AddAmbiente(ambiente.toJson())

            return sql.insertId;
        }

    async del(id){
        const linhasAfetadas =  await this.#db.delAmbiente(id)
        return linhasAfetadas.affectedRows
    }

    async att(nomeA, id){
        const ambiente = new Ambiente(nomeA)
        ambiente.id = id

        const r = await this.#db.upAmbiente(
            ambiente.nomeA,
            ambiente.id
        )

        return r.affectedRows;
    }
}

module.exports = AmbienteDAO