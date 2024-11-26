const DataBaseMySQL = require('../../DataBase/database')

class Horario_aula {

    #id
    #dia
    #horaInicio

    constructor(dia, horaInicio){
        this.#dia = dia
        this.#horaInicio = horaInicio
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get dia() {
        return this.#dia
    }
    set dia(value) {
        this.#dia = value
    }

    get horaInicio() {
        return this.#horaInicio
    }
    set horaInicio(value) {
        this.#horaInicio = value
    }

    toJson(){

        return {
            "id": this.#id,
            "dia": this.#dia,
            "horaInicio": this.#horaInicio,
        }
    }
}

class Horario_AulaDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_horario = []

        const query = await this.#db.selectHorario()

        for (let index = 0; index < query.length; index++) {

            const horario = new Horario_aula()

            horario.id = query[index].id_horario
            horario.dia = query[index].dia_semana
            horario.horaInicio = query[index].hora_inicio

            list_horario.push(horario.toJson())     
        }


       
        return list_horario
    }
    async consultarUm(id){      

        const query = await this.#db.selectHorarioId(id)

        
        const horario = new Horario_aula()

        if(query){
            horario.id = query[0].id_horario
            horario.dia = query[0].dia_semana
            horario.horaInicio = query[0].hora_inicio
        }

 
        return horario.toJson()
    }
}

module.exports = Horario_AulaDAO