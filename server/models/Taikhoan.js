const mongoose = require('mongoose')

const TaikhoanSchema = new mongoose.Schema({
  MaTK: {
    type: String,
    required: true
  },
  TenDangNhap: {
    type: String,
    required: true,
    unique: true
  },
  MatKhau: {
    type: String,
    required: true
  },
  HoTen: {
    type: String,
    required: true
  },
  LoaiTK: {
    type: String,
    required: true,
    enum: ['Admin', 'NhanVien']
  }
})

const Taikhoan = mongoose.model('Taikhoan', TaikhoanSchema);
module.exports = Taikhoan;