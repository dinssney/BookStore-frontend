import axios from 'axios';

const API_BASE = `${import.meta.env.VITE_API_URL}/api/v1/books`;

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const bookService = {
  async getAllBooks() {
    try {
      const response = await axiosInstance.get('');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch books');
    }
  },

  async getBookById(id) {
    try {
      const response = await axiosInstance.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch book');
    }
  },

  async createBook(bookData) {
    try {
      const response = await axiosInstance.post('/', bookData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create book');
    }
  },

  async updateBook(id, bookData) {
    try {
      const response = await axiosInstance.put(`/${id}`, bookData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update book');
    }
  },

  async deleteBook(id) {
    try {
      await axiosInstance.delete(`/${id}`);
      return true;
    } catch (error) {
      throw new Error('Failed to delete book');
    }
  }
};

export default bookService;