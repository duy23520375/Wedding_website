const mongoose = require('mongoose')

const BaocaoSchema = new mongoose.Schema({
  MABAOCAO: {
    type: String,
    required: true
  },
  MAHOADON: {
    type: String,
    required: true,
    ref: 'Hoadon'
  },
  THANG: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  NAM: {
    type: Number,
    required: true,
    min: 2000
  },
  DOANHTHU: {
    type: Number,
    required: true,
    min: 0
  }
})

const Baocao = mongoose.model('Baocao', BaocaoSchema);
module.exports = Baocao;