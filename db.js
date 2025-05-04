require('dotenv').config()
const mongoose = require('mongoose')
const mongoURL = process.env.MONGODB_URL
console.log(process.env.MONGODB_URL)

mongoose.connect(mongoURL)

const  datab = mongoose.connection;
datab.on('connected', () =>{
  console.log('connected to mongo server')
})
datab.on('error', (err) =>{
  console.log('connection error', err.message)
})
datab.on('disconnected', () =>{
  console.log('mongo disconnected')
})

module.exports = datab