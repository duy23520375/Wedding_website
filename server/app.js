const express = require('express')
const datab = require('./db')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json())
require('dotenv').config()
const corsMiddleware = require('./cors-config')

// Áp dụng CORS middleware
app.use(corsMiddleware)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Person = require('./models/Person')
const PORT = process.env.PORT || 3000

// Middleware kiểm tra tham số
const checkAuthParams = (req, res, next) => {
  if (!req.query.username || !req.query.password) {
    return res.status(400).send('Vui lòng nhập username và password')
  }
  next()
}

// Middleware ghi log
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request to: ${req.originalUrl}`)
  next()
}
app.use(logRequest)

// Cấu hình Passport với xác thực chặt chẽ
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, username, password, done) => {
    try {
      // 1. Tìm user trong database
      const user = await Person.findOne({ username: username })
      
      // 2. Kiểm tra user tồn tại
      if (!user) {
        console.log('Sai username:', username)
        return done(null, false, { message: 'Sai tên đăng nhập hoặc mật khẩu' })
      }
      
      // 3. Kiểm tra mật khẩu CHÍNH XÁC
      if (user.password !== password) {
        console.log('Sai password cho user:', username)
        return done(null, false, { message: 'Sai tên đăng nhập hoặc mật khẩu' })
      }
      
      // 4. Xác thực thành công
      console.log('Đăng nhập thành công:', username)
      return done(null, user)
    } catch (err) {
      console.error('Lỗi xác thực:', err)
      return done(err)
    }
  }
))

app.use(passport.initialize())

// Route chính với xác thực nghiêm ngặt
app.get('/',
  checkAuthParams,
  (req, res, next) => {
    // Chuyển query params thành body để passport đọc
    req.body = {
      username: req.query.username,
      password: req.query.password
    }
    next()
  },
  passport.authenticate('local', { 
    session: false,
    failureMessage: true 
  }),
  (req, res) => {
    res.send('Welcome to our website')
  }
)

// Xử lý lỗi xác thực
app.use((err, req, res, next) => {
  if (err.message) {
    return res.status(401).send(err.message)
  }
  next(err)
})

// Các routes khác
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')
const sanhRoutes = require('./routes/sanhRoutes')
const tieccuoiRoutes = require('./routes/tieccuoiRoutes')
const monanRoutes = require('./routes/monanRoutes')
const dichvuRoutes = require('./routes/dichvuRoutes')
const taikhoanRoutes = require('./routes/taikhoanRoutes')
const chitietmonanRoutes = require('./routes/chitietmonanRoutes')
const chitietdichvuRoutes = require('./routes/chitietdichvuRoutes')
const hoadonRoutes = require('./routes/hoadonRoutes')
const baocaoRoutes = require('./routes/baocaoRoutes')

app.use('/person', personRoutes)
app.use('/menu', menuRoutes)
app.use('/sanh', sanhRoutes)
app.use('/tieccuoi', tieccuoiRoutes)
app.use('/monan', monanRoutes)
app.use('/dichvu', dichvuRoutes)
app.use('/taikhoan', taikhoanRoutes)
app.use('/chitietmonan', chitietmonanRoutes)
app.use('/chitietdichvu', chitietdichvuRoutes)
app.use('/hoadon', hoadonRoutes)
app.use('/baocao', baocaoRoutes)


app.listen(PORT, () => {
  console.log('Server đang chạy trên port', PORT)
})