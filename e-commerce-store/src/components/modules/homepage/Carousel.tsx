import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/homepage.css';

interface CarouselItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Summer Collection 2023',
      subtitle: 'Discover our latest arrivals with up to 40% off. Limited time offer!',
      buttonText: 'Shop Now',
      buttonLink: '/products',
      secondaryButtonText: 'Learn More',
      secondaryButtonLink: '/about'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Exclusive Deals',
      subtitle: 'Shop premium products at unbeatable prices. Free shipping on orders over $50!',
      buttonText: 'View Deals',
      buttonLink: '/deals',
      secondaryButtonText: 'Browse Categories',
      secondaryButtonLink: '/categories'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'New Season Arrivals',
      subtitle: 'Be the first to shop our latest collection. Exclusive designs just for you!',
      buttonText: 'Explore Now',
      buttonLink: '/new-arrivals'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const goToNextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToPrevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setActiveIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== activeIndex) {
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <section className="carousel-section">
      <div className="carousel-container">
        <div className="carousel-inner">
          {carouselItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="carousel-overlay"></div>
              <div className="carousel-content">
                <div className="carousel-text">
                  <h1 className="carousel-title">{item.title}</h1>
                  <p className="carousel-subtitle">{item.subtitle}</p>
                  <div className="carousel-buttons">
                    <Link to={item.buttonLink} className="cta-button primary">
                      {item.buttonText}
                    </Link>
                    {item.secondaryButtonText && (
                      <Link to={item.secondaryButtonLink || '#'} className="cta-button secondary">
                        {item.secondaryButtonText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control prev" onClick={goToPrevSlide} aria-label="Previous slide">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="carousel-control next" onClick={goToNextSlide} aria-label="Next slide">
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="carousel-indicators">
          {carouselItems.map((_, index) => (
            <button 
              key={index} 
              className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;