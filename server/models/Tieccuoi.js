const mongoose = require('mongoose')

const TieccuoiSchema = new mongoose.Schema({
  MATIEC: {
    type: String,
    required: true
  },
  NGAYDAI: {
    type: Date,
    required: true
  },
  TIENCOC: {
    type: Number,
    required: true,
    min: 0
  },
  CA: {
    type: String,
    required: true
  },
  SOLUONGBAN: {
    type: Number,
    required: true
  },
  MASANH: {
    type: String,
    required: true,
    ref: 'Sanh'
  },
  SOBANDT: {
    type: Number,
    required: true
  },
  TENCR: {
    type: String,
    required: true
  },
  TENCD: {
    type: String,
    required: true
  },
  SDT: {
    type: String,
    required: true,
    match: /^\d{10}$/
  },

})

const Tieccuoi = mongoose.model('Tieccuoi', TieccuoiSchema);
module.exports = Tieccuoi;
