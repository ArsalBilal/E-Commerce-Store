import React from 'react';
import Carousel from '../modules/homepage/Carousel';
import HeroSection from '../modules/homepage/HeroSection';
import FeaturedProducts from '../modules/homepage/FeaturedProducts';
import BrandStory from '../modules/homepage/BrandStory';
import Testimonials from '../modules/homepage/Testimonials';
import Partners from '../modules/homepage/Partners';
import CategoryShowcase from '../modules/homepage/CategoryShowcase';
import NewsletterSignup from '../modules/homepage/NewsletterSignup';
import Footer from '../base/Footer';
import Navbar from '../base/Navbar';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <Navbar />
      <HeroSection />
      <Carousel />
      <FeaturedProducts />
      <BrandStory />
      <Testimonials />
      <Partners />
      <CategoryShowcase />
      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default HomePage;
