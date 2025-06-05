const mongoose = require('mongoose')

const ChitietdichvuSchema = new mongoose.Schema({
  MATIEC: {
    type: String,
    required: true,
    ref: 'Tieccuoi'
  },
  MADICHVU: {
    type: String,
    required: true,
    ref: 'Dichvu'
  },
  SOLUONG: {
    type: Number,
    required: true,
    min: 1
  },
  GIATIEN: {
    type: Number,
    required: true,
    min: 0
  },
  GHICHU: {
    type: String
  }
})

ChitietdichvuSchema.index({ MATIEC: 1, MADICHVU: 1 }, { unique: true });

const Chitietdichvu = mongoose.model('Chitietdichvu', ChitietdichvuSchema);
module.exports = Chitietdichvu;