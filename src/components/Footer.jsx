import React from 'react';
import '../styles/global.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} BookStore. All rights reserved.</p>
          <nav className="footer-nav">
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;