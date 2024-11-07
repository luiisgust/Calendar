const express = require('express')
const app = express()
const consign = require('consign')
const cors = require('cors')

app.set('view engine','ejs')
app.set('view','mvc/view')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

consign()
    .include('mvc/controller')
    .into(app)

    app.listen(process.env.PORT || 3000, () => console.log('Online server at port 3000'))
module.exports = app