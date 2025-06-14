# Hướng dẫn kết nối Frontend (React) và Backend (Node.js)

Dự án này bao gồm hai phần chính:
- **Frontend**: Ứng dụng React (TypeScript) sử dụng Vite
- **Backend**: API Node.js với Express và MongoDB

## Cấu trúc dự án

```
Node.js/
├── client/            # Frontend React
│   ├── src/
│   │   ├── utils/
│   │   │   └── api.ts # Service API để kết nối với backend
│   │   └── pages/
│   │       └── ExamplePage.tsx # Trang ví dụ kết nối API
└── server/            # Backend Node.js
    ├── routes/        # API endpoints
    ├── models/        # Mongoose models
    ├── app.js         # Express app
    ├── db.js          # Kết nối MongoDB
    └── cors-config.js # Cấu hình CORS
```

## Cách kết nối Frontend và Backend

### 1. Cài đặt các thư viện cần thiết

**Backend (Node.js)**
```bash
cd server
npm install cors
```

**Frontend (React)**
```bash
cd client
npm install
```

### 2. Chạy Backend

```bash
cd server
npm install
node app.js
```

Backend sẽ chạy trên http://localhost:3000

### 3. Chạy Frontend

```bash
cd client
npm run dev
```

Frontend sẽ chạy trên http://localhost:5173

#   W e d d i n g _ w e b s i t e  
 #   W e d d i n g  
 