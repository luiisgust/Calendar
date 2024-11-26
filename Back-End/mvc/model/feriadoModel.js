const DataBaseMySQL = require('../../DataBase/database')

class Feriado {

    #id
    #nome
    #dia

    constructor(nome, dia){
        this.#nome = nome
        this.#dia = dia
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

    get dia() {
        return this.#dia
    }
    set dia(value) {
        this.#dia = value
    }

    toJson(){

        return {
            "id": this.#id,
            "nome": this.#nome,
            "dia": this.#dia,
        }
    }
}

class FeraidoDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_feriado = []

        const query = await this.#db.selectFeriado()

        for (let index = 0; index < query.length; index++) {

            const feriado = new Feriado()

            feriado.id = query[index].id_feriado
            feriado.nome = query[index].nome_feriado
            feriado.dia = query[index].dia_feriado

            list_feriado.push(feriado.toJson())     
        }


       
        return list_feriado
    }
    async consultarUm(id){      

        const query = await this.#db.selectFeriadoId(id)

        
        const feriado = new Feriado()

        if(query){
            feriado.id = query[0].id_feriado
            feriado.nome = query[0].nome_feriado
            feriado.dia = query[0].dia_feriado
        }

 
        return feriado.toJson()
    }
}

module.exports = FeraidoDAO