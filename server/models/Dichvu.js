const mongoose = require('mongoose')

const DichvuSchema = new mongoose.Schema({
  MADICHVU: {
    type: String,
    required: true
  },
  TENDICHVU: {
    type: String,
    required: true
  },
  DONGIA: {
    type: Number,
    required: true
  },
  GHICHU: {
    type: String
  }
})

const Dichvu = mongoose.model('Dichvu', DichvuSchema);
module.exports = Dichvu;