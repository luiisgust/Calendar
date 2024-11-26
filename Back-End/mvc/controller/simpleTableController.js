const Fator = require('../model/fatorModel')
const Feriado = require('../model/feriadoModel')
const Horario = require('../model/horarioModel')
const Periodo = require('../model/periodoModel')

module.exports = (app) => {


    // Todos os gets
    app.get("/fator", async (req, res) => {        
        const fator = new Fator()
        
        res.json(await fator.consultarTodos())        
    })
    app.get("/fator/:id", async (req, res) => {
        const fator = new Fator()
        const status = await fator.consultarUm(req.params.id)

        res.json(status)
    })
        
    app.get("/feriado", async (req, res) => {        
        const feriado = new Feriado()
        
        res.json(await feriado.consultarTodos())        
    })
    app.get("/feriado/:id", async (req, res) => {
        const feriado = new Feriado()
        const status = await feriado.consultarUm(req.params.id)

        res.json(status)
    })
        
    app.get("/horario", async (req, res) => {        
        const horario = new Horario()
        
        res.json(await horario.consultarTodos())        
    })
    app.get("/horario/:id", async (req, res) => {
        const horario = new Horario()
        const status = await horario.consultarUm(req.params.id)

        res.json(status)
    })
        
    app.get("/periodo", async (req, res) => {        
        const periodo = new Periodo()
        
        res.json(await periodo.consultarTodos())        
    })
    app.get("/periodo/:id", async (req, res) => {
        const periodo = new Periodo()
        const status = await periodo.consultarUm(req.params.id)

        res.json(status)
    })
        
    
 
    
}