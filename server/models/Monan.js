const mongoose = require('mongoose')

const MonanSchema = new mongoose.Schema({
  MAMONAN: {
    type: String,
    required: true
  },
  TENMONAN: {
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

const Monan = mongoose.model('Monan', MonanSchema);
module.exports = Monan;