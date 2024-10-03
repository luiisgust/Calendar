const express = require('express')
const app = express()
const consign = require('consign')

app.set('view engine','ejs')
app.set('view','mvc/view')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static('mvc/view'))

consign()
    .include('mvc/controller')
    .into(app)

app.listen(3000, () => console.log('Online server at port 3000'))
module.exports = app