const express = require('express')
const datab = require('./db')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json())
require('dotenv').config()
const PORT = process.env.PORT || 3000


const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')


app.use('/person',personRoutes)
app.use('/menu',menuRoutes)
app.listen(PORT, () =>{
  console.log('listening on port 3000')
})