// API service để kết nối React frontend với Node.js backend

// URL cơ sở của API backend
const API_BASE_URL = 'http://localhost:3000';

/**
 * Hàm fetch API chung với xử lý lỗi
 * @param endpoint - Đường dẫn API endpoint
 * @param options - Tùy chọn fetch
 * @returns Promise với dữ liệu phản hồi đã được parse
 */
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  try {
    // Thiết lập headers mặc định
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    // Kết hợp headers mặc định với headers tùy chỉnh
    const headers = {
      ...defaultHeaders,
      ...(options.headers || {}),
    };

    // Thực hiện request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Kiểm tra nếu response không thành công
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    // Parse và trả về dữ liệu JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Các hàm API cụ thể
 */
export const api = {
  // Lấy danh sách người dùng
  getPersons: () => fetchAPI('/person'),
  
  // Lấy thông tin người dùng theo ID
  getPerson: (id: string) => fetchAPI(`/person/${id}`),
  
  // Tạo người dùng mới
  createPerson: (data: any) => fetchAPI('/person', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Cập nhật thông tin người dùng
  updatePerson: (id: string, data: any) => fetchAPI(`/person/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // Xóa người dùng
  deletePerson: (id: string) => fetchAPI(`/person/${id}`, {
    method: 'DELETE',
  }),

  // Thêm các API endpoints khác tương tự cho các routes khác
  // Ví dụ:
  getMenus: () => fetchAPI('/menu'),
  getSanh: () => fetchAPI('/sanh'),
  // Lấy danh sách tiệc cưới
  getParties: () => fetchAPI('/tieccuoi'),
  
  // Tạo tiệc cưới mới
  post: (endpoint: string, data: any) => fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Cập nhật tiệc cưới
  put: (endpoint: string, data: any) => fetchAPI(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Xóa tiệc cưới
  delete: (endpoint: string) => fetchAPI(endpoint, {
    method: 'DELETE',
  })
  // ... thêm các endpoints khác tùy theo nhu cầu
};

export default api;