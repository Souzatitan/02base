// Footer.js
import React from 'react';
import '../Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Sua Pizzaria. Todos os direitos reservados.</p>
        <p>
          Siga-nos nas redes sociais:
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> Facebook </a>
          | 
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> Instagram </a>
          | 
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"> Twitter </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
