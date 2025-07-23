const express = require('express');
const session = require('express-session');
const consign = require('consign');
const cors = require('cors');
const os = require('os');
const ejs = require('ejs')

const app = express();

// Detecta o IP ativo
function detectActiveIP() {
    const networkInterfaces = os.networkInterfaces();
    let activeIP = null;

    Object.keys(networkInterfaces).forEach((iface) => {
        networkInterfaces[iface].forEach((details) => {
            if (details.family === 'IPv4' && !details.internal) {
                if (['192.168.0.162', '10.172.204.45'].includes(details.address)) {
                    activeIP = details.address;
                }
            }
        });
    });

    return activeIP;
}

// Configura a origem permitida com base no IP ativo
const activeIP = detectActiveIP();
let allowedOrigin;

if (activeIP === '192.168.0.162') {
    allowedOrigin = 'http://192.168.0.162:8080'; // Origin para o IP 192.168.0.162
} else if (activeIP === '10.172.204.45') {
    allowedOrigin = 'http://10.172.204.45:8080'; // Origin para o IP 10.172.204.45
} else {
    allowedOrigin = process.env.DEFAULT_ALLOWED_ORIGIN || 'http://localhost:8080'; // Fallback
}

console.log(`IP ativo detectado: ${activeIP}`);
console.log(`Origem permitida configurada como: ${allowedOrigin}`);

// Configuração do Express
app.set('view engine', 'ejs');
app.set('views', 'mvc/view');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do CORS
app.use(cors({
    origin: (origin, callback) => {
        console.log('Origem da requisição:', origin);
        if (!origin || origin === allowedOrigin) {
            callback(null, true);
        } else {
            console.error('Origem não permitida:', origin);
            callback(new Error('Não autorizado pelo CORS'));
        }
    },
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


app.use(express.static("../Front-End/Screens/MainScreen"))

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));

module.exports = app;
