import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL}/api/v1/user-books`;

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const userBooksService = {
  async getUserBooks() {
    try {
      const response = await axiosInstance.get('');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user books');
    }
  },

  async addBookToUser(bookId) {
    try {
      const response = await axiosInstance.post(`/${bookId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add book to user');
    }
  },

  async removeBookFromUser(bookId) {
    try {
      await axiosInstance.delete(`/${bookId}`);
      return true;
    } catch (error) {
      throw new Error('Failed to remove book from user');
    }
  }
};

export default userBooksService;