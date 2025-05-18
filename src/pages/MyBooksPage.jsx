import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userBooksService from '../services/userBooksService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/global.css';

const MyBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await userBooksService.getUserBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleRemoveBook = async (bookId) => {
    if (window.confirm('Are you sure you want to remove this book from your library?')) {
      try {
        await userBooksService.removeBookFromUser(bookId);
        setBooks(books.filter(book => book.ID !== bookId));
        toast.success('Book removed from your library successfully!');
      } catch (err) {
        setError('Failed to remove book from your library');
        toast.error('Failed to remove book from your library');
      }
    }
  };

  if (loading) return <div className="text-center">Loading your books...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <>
      <Header />
      <main className="container py-4">
        <h1 className="text-center mb-4">My Books</h1>
        <div className="row">
          {books.map(book => (
            <div className="col-md-4 mb-4" key={book.ID}>
              <div className="card h-100">
                {book.cover_image_url && (
                  <img
                    src={book.cover_image_url}
                    alt={book.title}
                    className="card-img-top"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text">by {book.author}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveBook(book.ID)} 
                      className="btn btn-link text-danger"
                      style={{ padding: '0', border: 'none' }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MyBooksPage;