import React, { useState, useEffect } from 'react';
import '../../../styles/homepage.css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: 'I\'ve been shopping here for over a year now, and I\'m consistently impressed by the quality of products and customer service. The shipping is always fast, and their return policy is hassle-free!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Tech Enthusiast',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'As someone who\'s very particular about tech gadgets, I appreciate the detailed product descriptions and high-quality photos. It helps me make informed decisions without having to visit a physical store.',
      rating: 5
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Fashion Blogger',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      quote: 'The selection of fashion items is amazing! I\'ve found unique pieces that I couldn\'t find anywhere else. The prices are reasonable, and the quality exceeds expectations. Highly recommend!',
      rating: 4
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-container">
          <div className="testimonials-inner">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`testimonial-item ${index === activeIndex ? 'active' : ''}`}
              >
                <div className="testimonial-content">
                  <div className="testimonial-quote">
                    <i className="fas fa-quote-left quote-icon"></i>
                    <p>{testimonial.quote}</p>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star ${i < testimonial.rating ? 'filled' : ''}`}
                      ></i>
                    ))}
                  </div>
                </div>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="testimonial-indicators">
          {testimonials.map((_, index) => (
            <button 
              key={index} 
              className={`testimonial-indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;