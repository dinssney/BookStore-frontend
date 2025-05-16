import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bookService from '../services/bookService';
import '../styles/global.css';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  return (
    <>
      <Header />
      <main className="container" style={{ flex: '1' }}>
        <div className="books-list mt-5">
          <h1 className="text-center mb-4">Book Collection</h1>

          {loading && <div className="text-center">Loading books...</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row">
            {books.map((book) => (
              <div className="col-12 col-sm-6 col-md-3 mb-4" key={book.ID}>
                <div className="card h-100">
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
