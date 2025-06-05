const mongoose = require('mongoose')

const HoadonSchema = new mongoose.Schema({
  MAHOADON: {
    type: String,
    required: true
  },
  MATIEC: {
    type: String,
    required: true,
    unique: true,
    ref: 'Tieccuoi'
  },
  NGAYTHANHTOAN: {
    type: Date,
    required: true
  },
  TONGTIEN: {
    type: Number,
    required: true,
    min: 0
  }
})

const Hoadon = mongoose.model('Hoadon', HoadonSchema);
module.exports = Hoadon;