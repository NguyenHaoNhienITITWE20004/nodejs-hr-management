// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // URL đến server của bạn, hãy thay đổi nếu cần

// Gửi yêu cầu đăng ký người dùng
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data; // Trả về dữ liệu người dùng sau khi đăng ký thành công
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Gửi yêu cầu đăng nhập người dùng
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Trả về token và thông tin đăng nhập nếu thành công
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
