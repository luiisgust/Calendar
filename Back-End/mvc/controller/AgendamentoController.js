const Agendamento = require('../model/agendamentoModel')
const path = require('path')
const verificarAutenticacao = require('../middleware/authMiddleware.js')

module.exports = (app) => {


    // Todos os gets
    app.get("/agendamento", verificarAutenticacao, async (req, res) => {
        const agendamento = new Agendamento()
        console.log('Requisição para /agendamento recebida');

        res.json(await agendamento.consultarTodos())
    })
    
    app.get("/agendamentos", verificarAutenticacao, async (req, res) => {
        res.sendFile(path.resolve('../Front-End/Screens/MainScreen/agendamento/agendamento.html'))
    })

    app.get("/agendamento/:id", async (req, res) => {
        const agendamento = new Agendamento()
        const resultado = await agendamento.consultarUm(req.params.id);
        if (resultado) {
            res.json(resultado);
        } else {
            res.status(404).json({ erro: 'Agendamento não encontrado.' });
        }
    })
    app.get("/addagendamento", (req, res) => {
        res.sendFile(path.resolve("../Front-End/Screens/MainScreen/agendamento/newagendamento.html"))
    })
    app.get("/attagendamento", (req, res) => {
        res.sendFile(path.resolve("../Front-End/Screens/MainScreen/agendamento/attagendamento.html"))
    })


    // Todos os post
    app.post('/registeragendamento', async (req, res) => {


        console.log(req.body)
        const agendamento = new Agendamento();
        const { id, turmaA, docenteA, ambienteA, periodoA, dataA } = req.body;

        let status;

        if (!id) {
            status = await agendamento.registrarAgendamento(turmaA, docenteA, ambienteA, periodoA, dataA)
            res.json({ isAuth: status })
        }
        else {
            status = await agendamento.att(id, turmaA, docenteA, ambienteA, periodoA, dataA)
            res.json({ isAuth: status })
        }


        // res.redirect("/missao")

    })


    // Delete
    app.delete("/agendamento/:id", async (req, res) => {
        const agendamento = new Agendamento()

        const status = await agendamento.del(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/agendamento/:id", async (req, res) => {
        const agendamento = new Agendamento()

        const {
            turmaA,
            docenteA,
            ambienteA,
            periodoA,
            dataA,
            id
        } = req.body;

        console.log({ turmaA, docenteA, ambienteA, periodoA, dataA, id })

        if (String(id) === req.params.id) {
            const r = await agendamento.att(turmaA, docenteA, ambienteA, periodoA, dataA, id);
            res.json({ msg: `O total de linhas alteradas: ${r}` });
        } else {
            res.status(400).json({ msg: 'ID do corpo e da URL não conferem.' });
        }
    })


}