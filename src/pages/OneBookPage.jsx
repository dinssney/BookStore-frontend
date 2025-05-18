import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bookService from '../services/bookService';
import userBooksService from '../services/userBooksService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/global.css';

const OneBookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const currentUserId = token ? JSON.parse(atob(token.split('.')[1])).user_id : null;
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.deleteBook(id);
        navigate('/', { state: { showToast: true, message: 'Book deleted successfully!' } });
      } catch (err) {
        setError('Failed to delete the book');
      }
    }
  };

  const handleAddToLibrary = async () => {
    try {
      await userBooksService.addBookToUser(id);
      toast.success('Book added to your library successfully!');
      navigate('/my-books');
    } catch (err) {
      setError('Failed to add book to your library');
      toast.error('Failed to add book to your library');
    }
  };

  if (loading) return <div className="text-center">Loading book details...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const isPublisher = currentUserId && book?.publisher?.ID === currentUserId;

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
                  <div className="d-flex justify-content-between align-items-center">
                    <h1 className="card-title">{book.title}</h1>
                    <div className="d-flex gap-2">
                      {isPublisher && (
                        <>
                          <Link to={`/edit-book/${id}`} className="btn btn-primary">
                            Edit Book
                          </Link>
                          <button onClick={handleDelete} className="btn btn-danger">
                            Delete Book
                          </button>
                        </>
                      )}
                      {token && !isPublisher && (
                        <button 
                          onClick={handleAddToLibrary} 
                          className="btn btn-success"
                        >
                          Add to My Library
                        </button>
                      )}
                    </div>
                  </div>
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