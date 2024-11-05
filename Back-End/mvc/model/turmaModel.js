const DataBaseMySQL = require('../../DataBase/database')

class Turma {

    #id
    #nomeT
    #docenteP
    #docenteA
    #cursoT
    #fatorT

    constructor(nomeT, docenteP, docenteA, cursoT, fatorT){
        this.#nomeT = nomeT
        this.#docenteP = docenteP
        this.#docenteA = docenteA
        this.#cursoT = cursoT
        this.#fatorT = fatorT
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get nomeT() {
        return this.#nomeT
    }
    set nomeT(value) {
        this.#nomeT = value
    }

    get docenteP() {
        return this.#docenteP
    }
    set docenteP(value) {
        this.#docenteP = value
    }

    get docenteA() {
        return this.#docenteA
    }
    set docenteA(value) {
        this.#docenteA = value
    }

    get cursoT() {
        return this.#cursoT
    }
    set cursoT(value) {
        this.#cursoT = value
    }

    get fatorT() {
        return this.#fatorT
    }
    set fatorT(value) {
        this.#fatorT = value
    }

    toJson(){

        return {
            "id": this.#id,
            "nomeT": this.#nomeT,
            "docenteP": this.#docenteP,
            "docenteA": this.#docenteA,
            "cursoT": this.#cursoT,
            "fatorT": this.#fatorT
        }
    }
}

class TurmaDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_turma = []

        const query = await this.#db.selectTurma()

        for (let index = 0; index < query.length; index++) {

            const turma = new Turma()

            turma.id = query[index].id_curso
            turma.nomeT = query[index].nome_turma
            turma.docenteP = query[index].id_docenteP
            turma.docenteA = query[index].id_docenteA
            turma.cursoT = query[index].id_curso
            turma.fatorT = query[index].id_fator

            list_turma.push(turma.toJson())     
        }


       
        return list_turma
    }

    async consultarUm(id){      

        const query = await this.#db.selectTurmaId(id)

        
        const turma = new Turma()

        if(query){
            turma.id = query[0].id_turma
            turma.nomeT = query[0].nome_turma
            turma.docenteP = query[0].id_docenteP
            turma.docenteA = query[0].id_docenteA
            turma.cursoT = query[0].id_curso
            turma.fatorT = query[0].id_fator
        }

 
        return turma.toJson()
    }


    async registrarturma(
        nomeT,
        docenteP,
        docenteA,
        cursoT,
        fatorT){

         
            const turma = new Turma(nomeT, docenteP, docenteA, cursoT, fatorT);

            const sql = await this.#db.AddTurma(turma.toJson())

            return sql.insertId;
        }

    async del(id){
        const linhasAfetadas =  await this.#db.delTurma(id)
        return linhasAfetadas.affectedRows
    }

    async att(nomeT, docenteP, docenteA, cursoT, fatorT, id){
        const turma = new Turma(nomeT, docenteP, docenteA, cursoT, fatorT)
        turma.id = id

        const r = await this.#db.upTurma(
            turma.nomeT,
            turma.docenteP,
            turma.docenteA,
            turma.cursoT,
            turma.fatorT,
            turma.id
        )

        return r.affectedRows;
    }
}

module.exports = TurmaDAO