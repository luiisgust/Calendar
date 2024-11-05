const DataBaseMySQL = require('../../DataBase/database')

class Curso {

    #id
    #nomeC
    #cargaC
    #dataI
    #dataF
    #horarioAulaC

    constructor(nomeC, cargaC, dataI, dataF, horarioAulaC){
        this.#nomeC = nomeC
        this.#cargaC = cargaC
        this.#dataI = dataI
        this.#dataF = dataF
        this.#horarioAulaC = horarioAulaC
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get nomeC() {
        return this.#nomeC
    }
    set nomeC(value) {
        this.#nomeC = value
    }

    get cargaC() {
        return this.#cargaC
    }
    set cargaC(value) {
        this.#cargaC = value
    }

    get dataI() {
        return this.#dataI
    }
    set dataI(value) {
        this.#dataI = value
    }

    get dataF() {
        return this.#dataF
    }
    set dataF(value) {
        this.#dataF = value
    }

    get horarioAulaC() {
        return this.#horarioAulaC
    }
    set horarioAulaC(value) {
        this.#horarioAulaC = value
    }

    toJson(){

        return {
            "id": this.#id,
            "nomeC": this.#nomeC,
            "cargaC": this.#cargaC,
            "dataI": this.#dataI,
            "dataF": this.#dataF,
            "horarioAulaC": this.#horarioAulaC
        }
    }
}

class CursoDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_curso = []

        const query = await this.#db.selectCurso()

        for (let index = 0; index < query.length; index++) {

            const curso = new Curso()

            curso.id = query[index].id_curso
            curso.nomeC = query[index].nome_curso
            curso.cargaC = query[index].carga_horaria
            curso.dataI = query[index].data_inicio
            curso.dataF = query[index].data_final
            curso.horarioAulaC = query[index].id_horarioAula

            list_curso.push(curso.toJson())     
        }


       
        return list_curso
    }

    async consultarUm(id){      

        const query = await this.#db.selectCursoId(id)

        
        const curso = new Curso()

        if(query){
            curso.id = query[0].id_curso
            curso.nomeC = query[0].nome_curso
            curso.cargaC = query[0].carga_horaria
            curso.dataI = query[0].data_inicio
            curso.dataF = query[0].data_final
            curso.horarioAulaC = query[0].id_horarioAula
        }

 
        return curso.toJson()
    }


    async registrarcurso(
        nomeC,
        cargaC,
        dataI,
        dataF,
        horarioAulaC){

         
            const curso = new Curso(nomeC, cargaC, dataI, dataF, horarioAulaC);

            const sql = await this.#db.AddCurso(curso.toJson())

            return sql.insertId;
        }

    async del(id){
        const linhasAfetadas =  await this.#db.delCurso(id)
        return linhasAfetadas.affectedRows
    }

    async att(nomeC, cargaC, dataI, dataF, horarioAulaC, id){
        const curso = new Curso(nomeC, cargaC, dataI, dataF, horarioAulaC)
        curso.id = id

        const r = await this.#db.upCurso(
            curso.nomeC,
            curso.cargaC,
            curso.dataI,
            curso.dataF,
            curso.horarioAulaC,
            curso.id
        )

        return r.affectedRows;
    }
}

module.exports = CursoDAO