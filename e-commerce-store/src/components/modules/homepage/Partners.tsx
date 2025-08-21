import React from 'react';
import '../../../styles/homepage.css';

const Partners: React.FC = () => {
  const partners = [
    { id: 1, name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
    { id: 2, name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
    { id: 3, name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { id: 4, name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
    { id: 5, name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
    { id: 6, name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  ];

  return (
    <section className="partners-section">
      <div className="container">
        <h2 className="section-title">Our Trusted Partners</h2>
        <p className="partners-subtitle">We collaborate with the world's leading brands to bring you quality products</p>
        
        <div className="partners-logo-container">
          {partners.map(partner => (
            <div key={partner.id} className="partner-logo">
              <img src={partner.logo} alt={`${partner.name} logo`} />
            </div>
          ))}
        </div>
        
        <div className="partners-cta">
          <p>Interested in becoming a partner?</p>
          <a href="/contact" className="btn-outline">Contact Us</a>
        </div>
      </div>
    </section>
  );
};

export default Partners;