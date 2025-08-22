import React, { useState } from 'react';
import '../../../styles/homepage-improved.css';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="newsletter-signup">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <div className="newsletter-icon">
              <i className="far fa-envelope"></i>
            </div>
            <h2 className="newsletter-title">Stay Updated</h2>
            <p className="newsletter-subtitle">Subscribe to our newsletter and get exclusive deals, new arrivals, and special offers delivered directly to your inbox!</p>
          </div>
          <form onSubmit={handleSubmit} className="newsletter-form">
            {!subscribed ? (
              <div className="form-group">
                <div className="input-wrapper">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" disabled={loading} className="newsletter-btn">
                    {loading ? (
                      <span className="loading-spinner"></span>
                    ) : (
                      <>
                        Subscribe <i className="fas fa-arrow-right"></i>
                      </>
                    )}
                  </button>
                </div>
                <p className="privacy-note">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            ) : (
              <div className="success-message">
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Thank you for subscribing!</h3>
                <p>You're now part of our community. We'll keep you updated with the latest news and offers.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
