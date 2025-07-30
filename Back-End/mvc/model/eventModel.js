const DataBaseMySQL = require('../../DataBase/database');

class Event {
    #nomeCurso
    #nomeTurma
    #nomeDocente
    #nomeSala
    #dataInicio
    #dataFinal
    #horaInicio
    #cargaHoraria

    constructor(nomeCurso, nomeTurma, nomeDocente, nomeSala, dataInicio, dataFinal, horaInicio, cargaHoraria) {
        this.#nomeCurso = nomeCurso;
        this.#nomeTurma = nomeTurma;
        this.#nomeDocente = nomeDocente;
        this.#nomeSala = nomeSala;
        this.#dataInicio = dataInicio;
        this.#dataFinal = dataFinal;
        this.#horaInicio = horaInicio;
        this.#cargaHoraria = cargaHoraria;
    }

    get nomeCurso() { return this.#nomeCurso }
    set nomeCurso(value) { this.#nomeCurso = value }

    get nomeTurma() { return this.#nomeTurma }
    set nomeTurma(value) { this.#nomeTurma = value }

    get nomeDocente() { return this.#nomeDocente }
    set nomeDocente(value) { this.#nomeDocente = value }

    get nomeSala() { return this.#nomeSala }
    set nomeSala(value) { this.#nomeSala = value }

    get dataInicio() { return this.#dataInicio }
    set dataInicio(value) { this.#dataInicio = value }

    get dataFinal() { return this.#dataFinal }
    set dataFinal(value) { this.#dataFinal = value }

    get horaInicio() { return this.#horaInicio }
    set horaInicio(value) { this.#horaInicio = value }

    get cargaHoraria() { return this.#cargaHoraria }
    set cargaHoraria(value) { this.#cargaHoraria = value }

    toJson() {
        return {
            nomeCurso: this.#nomeCurso,
            nomeTurma: this.#nomeTurma,
            nomeDocente: this.#nomeDocente,
            nomeSala: this.#nomeSala,
            dataInicio: this.#dataInicio,
            dataFinal: this.#dataFinal,
            horaInicio: this.#horaInicio,
            cargaHoraria: this.#cargaHoraria
        };
    }
}

class EventDAO {
    #db

    constructor() {
        this.#db = new DataBaseMySQL();
    }

    async consultarTodos(idTurma) {
        const row = await this.#db.eventAgenda(idTurma);

        if (!row) {
            console.warn("Nenhum dado encontrado para idTurma:", idTurma);
            return null;
        }

        const event = new Event(
            row.nomeCurso,
            row.nomeTurma,
            row.nomeDocente,
            row.nomeSala,
            row.dataInicio,
            row.dataFinal,
            row.horaInicio,
            row.cargaHoraria
        );

        return event.toJson();
    }
}

module.exports = EventDAO;
