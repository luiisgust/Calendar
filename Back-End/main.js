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
    origin: true, // Substitua pelo endereço do seu front-end
    credentials: true
}));

app.use(session({
    secret: 'C4l$nd4r2024', // Chave secreta para assinar a sessão
    resave: false,                // Não salva a sessão se nenhuma modificação foi feita
    saveUninitialized: false,     // Não cria uma sessão para clientes não autenticados
    cookie: {
        maxAge: 60 * 60 * 1000,   // Tempo de vida do cookie da sessão (1 hora)
        secure: true,            // Use "true" se estiver usando HTTPS
        httpOnly: true            // Protege contra acessos via JavaScript
    }
}));

consign()
    .include('mvc/controller')
    .into(app)

    app.listen(process.env.PORT || 3000, () => console.log('Online server at port 3000'))
module.exports = app