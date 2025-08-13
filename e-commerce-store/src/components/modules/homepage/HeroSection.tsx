import React from 'react';
import { Link } from 'react-router-dom';
import "../../../styles/homepage.css";

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Discover Amazing Products
              <br />
              <span className="highlight">Up to 50% OFF</span>
            </h1>
            <p className="hero-subtitle">
              Shop the latest trends and exclusive deals on our premium collection
            </p>
            <Link to="/products" className="cta-button">
              Shop Now
            </Link>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Featured Product" 
              className="hero-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
