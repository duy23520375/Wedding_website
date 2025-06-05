const mongoose = require('mongoose')

const SanhSchema = new mongoose.Schema({
  MASANH: {
    type: String,
    required: true
  },
  TENSANH: {
    type: String,
    require: true,
  },
  LOAISANH: {
    type: String,
    required: true
  },
  SOLUONGBANTD: {
    type: Number,
    required: true
  },
  DONGIABANTT: {
    type: Number,
    required: true
  },
  GHICHU: {
    type: String,
    required: true
  }
})

const Sanh =mongoose.model('Sanh',SanhSchema);
module.exports = Sanh;
