const mongoose = require('mongoose')
const mongoURL = 'mongodb://localhost:27017/weddingplan'

mongoose.connect(mongoURL)

const  datab = mongoose.connection;
datab.on('connected', () =>{
  console.log('connected to mongo server')
})
datab.on('error', () =>{
  console.log('connection error')
})
datab.on('disconnected', () =>{
  console.log('mongo disconnected')
})

module.exports = datab