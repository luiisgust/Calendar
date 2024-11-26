const DataBaseMySQL = require('../../DataBase/database')

class Fator {

    #id
    #tempo

    constructor(tempo){
        this.#tempo = tempo
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get tempo() {
        return this.#tempo
    }
    set tempo(value) {
        this.#tempo = value
    }

    toJson(){

        return {
            "id": this.#id,
            "tempo": this.#tempo
        }
    }
}

class FatorDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_fator = []

        const query = await this.#db.selectFator()

        for (let index = 0; index < query.length; index++) {

            const fator = new Fator()

            fator.id = query[index].id_fator
            fator.tempo = query[index].tempo_aula

            list_fator.push(fator.toJson())     
        }


       
        return list_fator
    }

    async consultarUm(id){      

        const query = await this.#db.selectFatorId(id)

        
        const fator = new Fator()

        if(query){
            fator.id = query[0].id_fator
            fator.tempo = query[0].tempo_aula
        }

 
        return fator.toJson()
    }
}

module.exports = FatorDAO