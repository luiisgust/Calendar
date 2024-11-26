const DataBaseMySQL = require('../../DataBase/database')

class Periodo {

    #id
    #nome

    constructor(nome){
        this.#nome = nome
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get nome() {
        return this.#nome
    }
    set nome(value) {
        this.#nome = value
    }

    toJson(){

        return {
            "id": this.#id,
            "nome": this.#nome,
        }
    }
}

class PeriodoDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_periodo = []

        const query = await this.#db.selectPeriodo()

        for (let index = 0; index < query.length; index++) {

            const periodo = new Periodo()

            periodo.id = query[index].id_periodo
            periodo.nome = query[index].nome_periodo

            list_periodo.push(periodo.toJson())     
        }


       
        return list_periodo
    }
    async consultarUm(id){      

        const query = await this.#db.selectPeriodoId(id)

        
        const periodo = new Periodo()

        if(query){
            periodo.id = query[0].id_periodo
            periodo.nome = query[0].nome_periodo
        }

 
        return periodo.toJson()
    }
}

module.exports = PeriodoDAO