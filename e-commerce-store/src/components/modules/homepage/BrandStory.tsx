import React from 'react';
import '../../../styles/homepage.css';

const BrandStory: React.FC = () => {
  return (
    <section className="brand-story">
      <div className="container">
        <div className="brand-story-content">
          <div className="brand-story-image">
            <img 
              src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
              alt="Our Brand Story" 
              className="brand-img"
            />
            <div className="brand-image-overlay"></div>
          </div>
          <div className="brand-story-text">
            <h2 className="brand-title">Our Story</h2>
            <div className="brand-divider"></div>
            <p className="brand-paragraph">
              Founded in 2010, our journey began with a simple mission: to provide high-quality products that combine style, functionality, and affordability. What started as a small online store has grown into a beloved brand trusted by customers worldwide.
            </p>
            <p className="brand-paragraph">
              We believe that great products should be accessible to everyone. That's why we work directly with manufacturers to cut out middlemen and pass the savings on to you, without compromising on quality or ethical standards.
            </p>
            <p className="brand-paragraph">
              Our team is passionate about curating collections that help you express your unique style. We're committed to sustainable practices and continuously strive to reduce our environmental footprint while creating products you'll love for years to come.
            </p>
            <div className="brand-stats">
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Years of Excellence</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50k+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Product Categories</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;