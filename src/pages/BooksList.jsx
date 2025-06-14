import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bookService from '../services/bookService';
import '../styles/global.css';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookService.getAllBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (location.state?.showToast && location.state.message) {
      toast.success(location.state.message);
      location.state.showToast = false;
      location.state.message = '';
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

  const handleBookClick = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <>
      <Header />
      <main className="container">
        <div className="books-list mt-5">
          <h1 className="text-center mb-4">Book Collection</h1>

          {loading && <div className="text-center">Loading books...</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row">
            {books.map((book) => (
              <div className="col-12 col-sm-6 col-md-3 mb-4" key={book.ID}>
                <div 
                  className="card h-100" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleBookClick(book.ID)}
                >
                  {book.cover_image_url && (
                    <img
                      src={book.cover_image_url}
                      alt={book.title}
                      className="card-img-top"
                      style={{ height: '450px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">by {book.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BooksList;