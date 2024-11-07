var mysql = require('mysql2')

class DataBaseMySQL {

    #connection

    constructor() {
        this.#connection = mysql.createPool({
            host: process.env.DATABASE_HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: process.env.DATABASE_PORT
        }).promise();
    }

    // Agendamento
    async selectAgendamento() {
        const query = await this.#connection.query('select * from agendamento')
        return query[0]
    }
    async selectAgendamentoId(id) {
        const query = await this.#connection.query('select * from agendamento where id_agendamento =' +id)
        return query[0]
    }
    async AddAgendamento(dados) {
        const sql = `insert into agendamento (id_turmaA, id_docenteA, id_ambienteA, id_periodoA, data_agendamento)
        values ('${dados.turmaA}','${dados.docenteA}','${dados.ambienteA}','${dados.periodoA}','${dados.data_agend}')`

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async delAgendamento(id) {
        const sql = 'delete from agendamento where id_agendamento ='+id

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async upAgendamento(turmaA, docenteA, ambienteA, periodoA, data_agend, id) {
        const sql = `update agendamento
            set id_turmaA = "${turmaA}",
                id_docenteA = "${docenteA}",
                id_ambienteA = "${ambienteA}",
                id_periodoA = "${periodoA}",
                data_agendamento = "${data_agend}"
            where id_agendamento = ${id}`

        const query = await this.#connection.execute(sql)
        return query[0]
    }

    // Ambiente
    async selectAmbiente() {
        const query = await this.#connection.query('select * from ambiente')
        return query[0]
    }
    async selectAmbienteId(id) {
        const query = await this.#connection.query('select * from ambiente where id_ambiente =' +id)
        return query[0]
    }
    async AddAmbiente(dados) {
        const sql = `insert into ambiente (nome_ambiente)
        values ('${dados.nomeA}')`

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async delAmbiente(id) {
        const sql = 'delete from ambiente where id_ambiente ='+id

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async upAmbiente(nomeA, id) {
        const sql = `update ambiente
            set nome_ambiente = "${nomeA}"
            where id_ambiente = ${id}`

        const query = await this.#connection.execute(sql)
        return query[0]
    }

    // Cursos
    async selectCurso() {
        const query = await this.#connection.query('select * from cursos')
        return query[0]
    }
    async selectCursoId(id) {
        const query = await this.#connection.query('select * from curso where id_curso =' +id)
        return query[0]
    }
    async AddCurso(dados) {
        const sql = `insert into cursos (nome_curso, carga_horaria, data_inicio, data_final, id_horarioAula)
        values ('${dados.nomeC}','${dados.carga}','${dados.dataI}','${dados.dataF}','${dados.horarioAulaC}')`

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async delCurso(id) {
        const sql = 'delete from cursos where id_curso ='+id

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async upCurso(nomeC, carga, dataI, dataF, horarioAulaC, id) {
        const sql = `update cursos
            set nome_curso = "${nomeC}",
                carga_horaria = "${carga}",
                data_inicio = "${dataI}",
                data_final = "${dataF}",
                id_horarioAula = "${horarioAulaC}"
            where id_curso = ${id}`

        const query = await this.#connection.execute(sql)
        return query[0]
    }

    // Docentes
    async selectDocente() {
        const query = await this.#connection.query('select * from docentes')
        return query[0]
    }
    async selectDocenteId(id) {
        const query = await this.#connection.query('select * from docentes where id_docente =' +id)
        return query[0]
    }
    async AddDocente(dados) {
        const sql = `insert into docentes (nome_docente, sobrenome_docente, nome_exibicao)
        values ('${dados.nomeD}','${dados.sobrenomeD}','${dados.exibicaoD}')`

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async delDocente(id) {
        const sql = 'delete from docentes where id_docente ='+id

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async upDocente(nomeD, sobrenomeD, exibicaoD, id) {
        const sql = `update docentes
            set nome_docente = "${nomeD}",
                sobrenome_docente = "${sobrenomeD}",
                nome_exibicao = "${exibicaoD}"
            where id_docente = ${id}`

        const query = await this.#connection.execute(sql)
        return query[0]
    }

    // Turmas
    async selectTurma() {
        const query = await this.#connection.query('select * from turmas')
        return query[0]
    }
    async selectTurmaId(id) {
        const query = await this.#connection.query('select * from turmas where id_turma =' +id)
        return query[0]
    }
    async AddTurma(dados) {
        const sql = `insert into turmas (nome_turma, id_docenteP, id_docenteA, id_curso, id_fator)
        values ('${dados.nomeT}','${dados.docenteP}','${dados.docenteA}','${dados.cursoT}','${dados.fatorT}')`

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async delTurma(id) {
        const sql = 'delete from turmas where id_turma ='+id

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async upTurma(nomeT, docenteP, docenteA, cursoT, fatorT, id) {
        const sql = `update turmas
            set nome_turma = "${nomeT}",
                id_docenteP = "${docenteP}",
                id_docenteA = "${docenteA}",
                id_curso = "${cursoT}",
                id_fator = "${fatorT}"
            where id_turma = ${id}`

        const query = await this.#connection.execute(sql)
        return query[0]
    }

    // Usuario
    async selectUsuarioLogin(emailU, senhaU) {
        const query = await this.#connection.query('select * from usuario where email_usuario =? and senha_usuario =?',[emailU, senhaU])
        return query
    }
    async selectUsuarioId(id) {
        const query = await this.#connection.query('select * from usuario where id_usuario =' +id)
        return query[0]
    }
    async AddUsuario(dados) {
        const sql = `insert into usuario (nome_usuario, email_usuario, senha_usuario)
        values ('${dados.nomeU}','${dados.emailU}','${dados.senhaU}')`

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async delUsuario(id) {
        const sql = 'delete from usuario where id_usuario ='+id

        const query = await this.#connection.execute(sql)
        return query[0]
    }
    async upUsuario(nomeU, emailU, senhaU, id) {
        const sql = `update usuario
            set nome_usuario = "${nomeU}",
                email_usuario = "${emailU}",
                senha_usuario = "${senhaU}"
            where id_usuario = ${id}`

        const query = await this.#connection.execute(sql)
        return query[0]
    }
}

module.exports = DataBaseMySQL