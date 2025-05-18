import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bookService from '../services/bookService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/global.css';

const PublishBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPublisher, setIsPublisher] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setIsPublisher(decodedToken.user_role === 'publisher');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const validateForm = () => {
    if (title.length < 4) {
      setError('Title must be at least 4 characters');
      return false;
    }
    if (author.length < 2) {
      setError('Author name must be at least 2 characters');
      return false;
    }
    if (!coverImageUrl) {
      setError('Cover image URL is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const bookData = {
        title,
        author,
        description,
        cover_image_url: coverImageUrl
      };
      
      await bookService.createBook(bookData);
      navigate('/', { 
        state: { 
          showToast: true, 
          message: 'Book published successfully!' 
        } 
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isPublisher) {
    return (
      <>
        <Header />
        <main className="container py-4">
          <div className="alert alert-danger text-center">
            Only publishers can publish books.
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Publish a New Book</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      minLength={4}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      id="author"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                      minLength={2}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="coverImageUrl" className="form-label">Cover Image URL</label>
                    <input
                      type="url"
                      className="form-control"
                      id="coverImageUrl"
                      value={coverImageUrl}
                      onChange={(e) => setCoverImageUrl(e.target.value)}
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Publishing...' : 'Publish Book'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PublishBookPage;