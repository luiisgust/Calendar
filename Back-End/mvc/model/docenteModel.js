const DataBaseMySQL = require('../../DataBase/database')

class Docente {

    #id
    #nomeD
    #sobrenomeD
    #exibicaoD

    constructor(nomeD, sobrenomeD, exibicaoD){
        this.#nomeD = nomeD
        this.#sobrenomeD = sobrenomeD
        this.#exibicaoD = exibicaoD
    }

    get id() {
        return this.#id
    }
    set id(value) {
        this.#id = value
    }

    get nomeD() {
        return this.#nomeD
    }
    set nomeD(value) {
        this.#nomeD = value
    }

    get sobrenomeD() {
        return this.#sobrenomeD
    }
    set sobrenomeD(value) {
        this.#sobrenomeD = value
    }

    get exibicaoD() {
        return this.#exibicaoD
    }
    set exibicaoD(value) {
        this.#exibicaoD = value
    }



    toJson(){

        return {
            "id": this.#id,
            "nomeD": this.#nomeD,
            "sobrenomeD": this.#sobrenomeD,
            "exibicaoD": this.#exibicaoD
        }
    }
}

class DocenteDAO{

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_docente = []

        const query = await this.#db.selectDocente()

        for (let index = 0; index < query.length; index++) {

            const docente = new Docente()

            docente.id = query[index].id_docente
            docente.nomeD = query[index].nome_docente
            docente.sobrenomeD = query[index].sobrenome_docente
            docente.exibicaoD = query[index].nome_exibicao

            list_docente.push(docente.toJson())     
        }


       
        return list_docente
    }

    async consultarUm(id){      

        const query = await this.#db.selectDocenteId(id)

        
        const docente = new Docente()

        if(query){
            docente.id = query[0].id_docente
            docente.nomeD = query[0].nome_docente
            docente.sobrenomeD = query[0].sobrenome_docente
            docente.exibicaoD = query[0].nome_exibicao
        }

 
        return docente.toJson()
    }


    async registrarDocente(
        nomeD, 
        sobrenomeD,
        exibicaoD){

         
            const docente = new Docente(nomeD, sobrenomeD, exibicaoD);

            const sql = await this.#db.AddDocente(docente.toJson())

            return sql.insertId;
        }

    async del(id){
        const linhasAfetadas =  await this.#db.delDocente(id)
        return linhasAfetadas.affectedRows
    }

    async att(nomeD, sobrenomeD, exibicaoD, id){
        const docente = new Docente(nomeD, sobrenomeD, exibicaoD)
        docente.id = id

        const r = await this.#db.upDocente(
            docente.nomeD,
            docente.sobrenomeD,
            docente.exibicaoD,
            docente.id
        )

        return r.affectedRows;
    }
}

module.exports = DocenteDAO