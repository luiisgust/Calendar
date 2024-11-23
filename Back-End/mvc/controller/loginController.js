const Login = require('../model/loginModel')


module.exports = (app) => {

    const verificarAutenticacao = (req, res, next) => {
        if (req.session.userId) {
            next(); // Usuário autenticado, continue para a próxima função
        } else {
            res.status(401).send({ error: 'Não autorizado!' });
        }
    };
    


    // Todos os gets
    app.get('/conta', verificarAutenticacao, (req, res) => {
        res.status(200).send({ message: 'Bem-vindo à sua conta!' });
    });
    
    app.get('/check-session', (req, res) => {
        if (req.session.userId) {
            res.json({ isAuth: true, userId: req.session.userId });
        } else {
            res.json({ isAuth: false, message: 'Nenhuma sessão ativa.' });
        }
    });

    app.get('/favicon.ico', (req, res) => res.status(204).end());



    // Todos os post
    app.post('/logar', (req, res) => {
        console.log('Dados recebidos no login:', req.body);
    
        try {
            const { emailU, senhaU } = req.body;
    
            // Simulação de autenticação
            if (emailU === 'gustavofon789@gmail.com' && senhaU === 'Eakemy26@') {
                req.session.userId = 1;
                console.log('Login bem-sucedido.');
                return res.status(200).json({ isAuth: true });
            } else {
                console.log('Login falhou: Credenciais incorretas.');
                return res.status(401).json({ isAuth: false, error: 'Credenciais incorretas.' });
            }
        } catch (error) {
            console.error('Erro no login:', error);
            return res.status(500).send('Erro interno do servidor.');
        }
    });
    
    
    

    app.post('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao encerrar sessão:', err);
                return res.status(500).json({ success: false, message: 'Erro ao fazer logout.' });
            }
            res.clearCookie('connect.sid'); // Limpa o cookie de sessão no navegador
            res.status(200).json({ success: true, message: 'Logout realizado com sucesso.' });
        });
    });
    
     
}