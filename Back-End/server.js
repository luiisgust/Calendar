const express = require('express');
const session = require('express-session');
const consign = require('consign');
const cors = require('cors');
const ejs = require('ejs')
const path = require("path")

const app = express();

const allowedOrigin = 'http://localhost:3000';

// Configuração do Express
app.set('view engine', 'ejs');
app.set('views', 'mvc/view');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do CORS
app.use(cors({
    origin: allowedOrigin,
    credentials: true,
}));


// Configuração da sessão
app.use(session({
    secret: process.env.SECRET || 'calendar',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hora
        secure: false, // Deve ser false se você estiver em HTTP
        httpOnly: true,
        sameSite: 'lax',
    },
}));

// Consign para incluir controllers
consign()
    .include('mvc/controller')
    .into(app);


app.use('/config', express.static(path.join(__dirname, '../Front-End/config')));
app.use('/assets', express.static(path.join(__dirname, "../Front-End/assets")))
app.use('/Login', express.static(path.join(__dirname, "../Front-End/Screens/Login")))
app.use('/MainScreen', express.static(path.join(__dirname, "../Front-End/Screens/MainScreen")))
app.use(express.static(path.join(__dirname, "../Front-End/Screens")))

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));

console.log(`Servidor acessivel em http://localhost:${PORT}`)
console.log(`Front-End estático servido de: ${path.join(__dirname, '../Front-End/Screens')}`)

module.exports = app;
