// Cấu hình CORS cho server Node.js
const cors = require('cors');

// Tạo middleware CORS với các tùy chọn
const corsOptions = {
  origin: 'http://localhost:5173', // URL của React frontend (Vite mặc định chạy trên port 5173)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Cho phép gửi cookies qua CORS nếu cần
};

module.exports = cors(corsOptions);