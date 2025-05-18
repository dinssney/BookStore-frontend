import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BooksList from './pages/BooksList';
import OneBookPage from './pages/OneBookPage';
import PublishBookPage from './pages/PublishBookPage';
import UpdateBookPage from './pages/UpdateBookPage';
import MyBooksPage from './pages/MyBooksPage'; // Import the new MyBooksPage component
import './styles/global.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BooksList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/books/:id" element={<OneBookPage />} />
          <Route path="/publish-book" element={<PublishBookPage />} />
          <Route path="/edit-book/:id" element={<UpdateBookPage />} />
          <Route path="/my-books" element={<MyBooksPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;