import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import bookService from '../services/bookService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/global.css';

const OneBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await bookService.getBookById(id);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div className="text-center">Loading book details...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <>
      <Header />
      <main className="container py-4">
        <div className="book-detail">
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <div className="book-cover-placeholder" style={{
                    width: '100%',
                    // height: '300px',
                    backgroundColor: 'var(--light-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--dark-color)',
                    borderRadius: 'var(--border-radius)',
                    objectFit: 'cover'
                  }}>
                    {book.cover_image_url ? (
                      <img src={book.cover_image_url} alt={book.title} className="img-fluid" />
                    ) : (
                      'No Cover Image'
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h1 className="card-title">{book.title}</h1>
                  <h3 className="card-subtitle mb-3 text-muted">by {book.author}</h3>
                  <p className="card-text">{book.description}</p>
                  <hr />
                  <div className="publisher-info">
                    <h5>Publisher Information</h5>
                    <p className="mb-1"><strong>Name:</strong> {book.publisher.username}</p>
                    <p><strong>Email:</strong> {book.publisher.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OneBookPage;