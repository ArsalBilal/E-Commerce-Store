import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/homepage-improved.css';
// Import individual icons as components
import { FaShippingFast, FaUndo, FaHeadset } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">Premium Shopping Experience</div>
            <h1 className="hero-title">
              Elevate Your Style
              <br />
              <span className="highlight">Shop Smarter Today</span>
            </h1>
            <p className="hero-subtitle">
              Discover curated collections that blend quality, style, and value.
              Join thousands of satisfied customers worldwide.
            </p>
            <div className="hero-features">
              <div className="hero-feature">
                <div className="feature-icon">
                  {React.createElement(FaShippingFast as any, { size: 20 })}
                </div>
                <span>Fast Delivery</span>
              </div>
              <div className="hero-feature">
                <div className="feature-icon">
                  {React.createElement(FaUndo as any, { size: 20 })}
                </div>
                <span>30-Day Returns</span>
              </div>
              <div className="hero-feature">
                <div className="feature-icon">
                  {React.createElement(FaHeadset as any, { size: 20 })}
                </div>
                <span>24/7 Support</span>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/products" className="cta-button primary">
                Explore Collection
              </Link>
              <Link to="/categories" className="cta-button secondary">
                View Categories
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Premium Shopping Experience" 
                className="hero-img"
              />
              <div className="hero-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
