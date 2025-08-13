import React, { useState } from 'react';
import "../../../styles/homepage.css";

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
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter and get exclusive deals, new arrivals, and more!</p>
          </div>
          <form onSubmit={handleSubmit} className="newsletter-form">
            {!subscribed ? (
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="newsletter-input"
                />
                <button type="submit" disabled={loading} className="newsletter-btn">
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            ) : (
              <div className="success-message">
                <p>Thank you for subscribing! 🎉</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
