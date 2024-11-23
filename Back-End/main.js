const express = require('express')
const session = require('express-session')
const app = express()
const consign = require('consign')
const cors = require('cors')

app.set('view engine','ejs')
app.set('view','mvc/view')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

 
app.use(cors({
    origin: 'http://192.168.0.135:8080', // Endereço do front-end
    credentials: true // Permitir cookies/sessões
}));


const allowedOrigins = ['http://192.168.0.135:8080', 'http://localhost:8080'];
app.use(cors({
    origin: (origin, callback) => {
        console.log('Origem da requisição:', origin); // Log de debug
        
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error('Origem não permitida:', origin); // Log de erro
            callback(new Error('Não autorizado pelo CORS'));
        }
    },
    credentials: true,
}));

app.use((req, res, next) => {
    console.log('Origem da requisição:', req.headers.origin);
    next();
});




app.use(session({
    secret: process.env.SECRET || 'calendar',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hora
        secure: false, // Deve ser false se você estiver em HTTP
        httpOnly: true,
        sameSite: 'lax'
    }
}));

consign()
    .include('mvc/controller')
    .into(app)

    app.listen(process.env.PORT || 3000, () => console.log('Online server at port 3000'))
module.exports = app 