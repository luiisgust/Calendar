const DataBaseMySQL = require('../../DataBase/database')

class Agendamento {

    #id
    #turmaA
    #docenteA
    #ambienteA
    #periodoA
    #dataA

    constructor(turmaA, docenteA, ambienteA, periodoA, dataA){
        this.#turmaA = turmaA
        this.#docenteA = docenteA
        this.#ambienteA = ambienteA
        this.#periodoA = periodoA
        this.#dataA = dataA
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get turmaA() {
        return this.#turmaA
    }
    set turmaA(value) {
        this.#turmaA = value
    }

    get docenteA() {
        return this.#docenteA
    }
    set docenteA(value) {
        this.#docenteA = value
    }

    get ambienteA() {
        return this.#ambienteA
    }
    set ambienteA(value) {
        this.#ambienteA = value
    }

    get periodoA() {
        return this.#periodoA
    }
    set periodoA(value) {
        this.#periodoA = value
    }

    get dataA() {
        return this.#dataA
    }
    set dataA(value) {
        this.#dataA = value
    }

    toJson(){

        return {
            "id": this.#id,
            "turmaA": this.#turmaA,
            "docenteA": this.#docenteA,
            "ambienteA": this.#ambienteA,
            "periodoA": this.#periodoA,
            "dataA": this.#dataA
        }
    }
}

class AgendamentoDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_agendamento = []

        const query = await this.#db.selectAgendamento()

        for (let index = 0; index < query.length; index++) {

            const agendamento = new Agendamento()

            agendamento.id = query[index].id_agendamento
            agendamento.turmaA = query[index].id_turmaA
            agendamento.docenteA = query[index].id_docenteA
            agendamento.ambienteA = query[index].id_ambienteA
            agendamento.periodoA = query[index].id_periodoA
            agendamento.dataA = query[index].data_agendamento

            list_agendamento.push(agendamento.toJson())     
        }


       
        return list_agendamento
    }

    async consultarUm(id){      

        const query = await this.#db.selectAgendamentoId(id)

        
        const agendamento = new Agendamento()

        if(query){
            agendamento.id = query[0].id_agendamento
            agendamento.turmaA = query[0].id_turmaA
            agendamento.docenteA = query[0].id_docenteA
            agendamento.ambienteA = query[0].id_ambienteA
            agendamento.periodoA = query[0].id_periodoA
            agendamento.dataA = query[0].data_agendamento
        }

 
        return agendamento.toJson()
    }


    async registrarAgendamento(
        turmaA,
        docenteA,
        ambienteA,
        periodoA,
        dataA){

         
            const agendamento = new Agendamento(turmaA, docenteA, ambienteA, periodoA, dataA);

            const sql = await this.#db.AddAgendamento(agendamento.toJson())

            return sql.insertId;
        }

    async del(id){
        const linhasAfetadas =  await this.#db.delAgendamento(id)
        return linhasAfetadas.affectedRows
    }

    async att(turmaA, docenteA, ambienteA, periodoA, dataA, id){
        const agendamento = new Agendamento(turmaA, docenteA, ambienteA, periodoA, dataA)
        agendamento.id = id

        const r = await this.#db.upAmbiente(
            agendamento.turmaA,
            agendamento.docenteA,
            agendamento.ambienteA,
            agendamento.periodoA,
            agendamento.dataA,
            agendamento.id
        )

        return r.affectedRows;
    }
}

module.exports = AgendamentoDAO