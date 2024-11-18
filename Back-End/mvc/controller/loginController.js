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
    app.get('/conta', (req, res) => {
        console.log('Sessão na rota /conta:', req.session);
    
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Não autorizado' });
        }
    
        res.json({
            nome: 'Nome do Usuário',
            email: 'email@example.com'
        });
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
    
        // Lógica de validação (substitua pela sua)
        const permitido = await new LoginDAO().logar(emailU, senhaU);
    
        if (permitido) {
            // Salvar na sessão
            req.session.userId = permitido.id;
            console.log('Sessão salva no login:', req.session);
    
            return res.json({ isAuth: true });
        } else {
            console.log('Login inválido');
            return res.status(401).json({ isAuth: false });
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