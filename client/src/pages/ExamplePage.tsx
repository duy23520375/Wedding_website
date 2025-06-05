import { useState, useEffect } from 'react';
import api from '../utils/api';
import './ExamplePage.css';

// Interface cho dữ liệu người dùng
interface Person {
  _id: string;
  name: string;
  age: number;
  workType: string;
  // Thêm các trường khác nếu cần
}

const ExamplePage = () => {
  // State để lưu trữ danh sách người dùng
  const [persons, setPersons] = useState<Person[]>([]);
  // State để lưu trạng thái loading
  const [loading, setLoading] = useState<boolean>(true);
  // State để lưu lỗi nếu có
  const [error, setError] = useState<string | null>(null);

  // Hàm để lấy dữ liệu từ API
  const fetchPersons = async () => {
    try {
      setLoading(true);
      const data = await api.getPersons();
      setPersons(data);
      setError(null);
    } catch (err) {
      setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div className="example-page">
      <h1>Ví dụ Kết nối Frontend-Backend</h1>
      <p>Trang này minh họa cách React frontend kết nối với Node.js backend</p>
      
      <button 
        onClick={fetchPersons}
        className="refresh-button"
      >
        Làm mới dữ liệu
      </button>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <p>Đảm bảo rằng:</p>
          <ul>
            <li>Server Node.js đang chạy trên port 3000</li>
            <li>CORS đã được cấu hình đúng trên server</li>
            <li>Kết nối mạng hoạt động bình thường</li>
          </ul>
        </div>
      ) : (
        <div className="data-container">
          <h2>Danh sách người dùng từ API:</h2>
          {persons.length === 0 ? (
            <p>Không có dữ liệu người dùng.</p>
          ) : (
            <ul className="person-list">
              {persons.map((person) => (
                <li key={person._id} className="person-item">
                  <strong>{person.name}</strong> - {person.age} tuổi
                  <p>Loại công việc: {person.workType}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="instructions">
        <h3>Hướng dẫn kết nối Frontend-Backend:</h3>
        <ol>
          <li>Cài đặt thư viện CORS trên server: <code>npm install cors</code></li>
          <li>Cấu hình CORS trong file app.js của server</li>
          <li>Tạo API service trong frontend để gọi các endpoints</li>
          <li>Sử dụng React hooks (useState, useEffect) để quản lý state và gọi API</li>
          <li>Xử lý các trạng thái loading và lỗi khi gọi API</li>
        </ol>
      </div>
    </div>
  );
};

export default ExamplePage;