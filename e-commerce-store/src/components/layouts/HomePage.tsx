import React from 'react';
import HeroSection from '../modules/homepage/HeroSection';
import FeaturedProducts from '../modules/homepage/FeaturedProducts';
import BestSellers from '../modules/homepage/BestSellers';
import NewArrivals from '../modules/homepage/NewArrivals';
import SpecialOffers from '../modules/homepage/SpecialOffers';
import NewsletterSignup from '../modules/homepage/NewsletterSignup';
import Footer from '../base/Footer';
import Navbar from '../base/Navbar';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
        <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <BestSellers />
      <NewArrivals />
      <SpecialOffers />
      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default HomePage;
