const LoginDAO = require('../model/loginModel');
const loginInstance = new LoginDAO();
const path = require('path')
const verificarAutenticacao = require('../middleware/authMiddleware.js')


module.exports = (app) => {

    // Todos os gets
    app.get('/conta', verificarAutenticacao, (req, res) => {
        res.status(200).send({ message: 'Bem-vindo!', userId: req.session.userId });
    });
    
    app.get('/check-session', (req, res) => {
        if (req.session.userId) {
            res.json({ isAuth: true, userId: req.session.userId });
        } else {
            res.json({ isAuth: false, message: 'Nenhuma sessão ativa.' });
        }
    });

    app.get('/home', verificarAutenticacao, (req, res) => {
        res.sendFile(path.resolve("../Front-End/Screens/Login/home.html"))
    })

    app.get('/favicon.ico', (req, res) => res.status(204).end());



    // Todos os post
    app.post('/logar', (req, res) => {
      console.log('Dados recebidos no login:', req.body);

      try {
        const { emailU, senhaU } = req.body;

        // Validação básica de campos
        if (!emailU || !senhaU) {
          return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        // Autenticação via loginModel
        loginInstance.logar(emailU, senhaU)
        .then(id_usuario => {
          if (id_usuario) {
            req.session.userId = id_usuario;
            return res.status(200).json({ isAuth: true, userId: id_usuario });
          } else {
            return res.status(401).json({ isAuth: false, error: 'Credenciais incorretas.' });
          }
        })
        .catch(error => {
          console.error('Erro interno no login:', error);
          res.status(500).send('Erro interno do servidor.');
        });

      } catch (error) {
        console.error('Erro inesperado no login:', error);
        return res.status(500).send('Erro inesperado no servidor.');
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