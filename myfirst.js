const express = require('express')
const datab = require('./db')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json())




const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')


app.use('/person',personRoutes)
app.use('/menu',menuRoutes)

app.listen(3000, () =>{
  console.log('listening on port 3000')
})