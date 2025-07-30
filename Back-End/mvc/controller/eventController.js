const EventDAO = require('../model/eventModel');

module.exports = (app) => {
    app.get("/event/:idTurma", async (req, res) => {
        const { idTurma } = req.params;
        const eventDAO = new EventDAO();

        res.setHeader("Access-Control-Allow-Origin", "*");

        try {
            const evento = await eventDAO.consultarTodos(idTurma);
            if (!evento) {
                return res.status(404).json({ erro: "Evento não encontrado." });
            }
            res.json(evento);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao consultar evento." });
        }
    });
};
