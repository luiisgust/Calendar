const Login = require('../model/loginModel')


module.exports = (app) => {

    function authMiddleware(req, res, next) {
        if (req.session.userId) {
            next(); // Usuário autenticado, prossiga para a próxima função
        } else {
            res.status(401).json({ message: 'Não autorizado. Por favor, faça login.' });
        }
    }


    // Todos os gets
    app.get('/conta', authMiddleware, async (req, res) => {
        const userId = req.session.userId;

        const dadosUsuario = await new Login().buscarDadosUsuario(userId);

        res.json(dadosUsuario);
    });
    app.get('/check-session', (req, res) => {
        if (req.session.userId) {
            res.json({ isAuth: true, userId: req.session.userId });
        } else {
            res.json({ isAuth: false, message: 'Nenhuma sessão ativa.' });
        }
    });


    // Todos os post
    app.post('/logar', async (req, res) => {
        const { emailU, senhaU } = req.body;

        let login = new Login();
        let userId = await login.logar(emailU, senhaU);

        if (userId) {
            req.session.userId = userId; // Salva o userId na sessão
            res.json({ isAuth: true });
        } else {
            res.json({ isAuth: false, message: 'Credenciais inválidas' });
        }
    });

    app.post('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao fazer logout.' });
            }
            res.clearCookie('connect.sid'); // Limpa o cookie de sessão
            res.json({ message: 'Logout bem-sucedido.' });
        });
    });
     
}