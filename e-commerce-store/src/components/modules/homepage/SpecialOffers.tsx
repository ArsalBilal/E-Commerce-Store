import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../../services/product';
import ProductCard from './ProductCard';
import { Product } from '../../../types';
import "../../../styles/homepage.css";

const SpecialOffers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpecialOffers = async () => {
      try {
        const data = await fetchProducts();
        // Filter products with discount
        const specialOffers = data
          .filter(product => product.discountPercentage && product.discountPercentage > 0)
          .slice(0, 8);
        setProducts(specialOffers);
      } catch (error) {
        console.error('Error loading special offers:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSpecialOffers();
  }, []);

  if (loading) {
    return (
      <section className="special-offers">
        <div className="container">
          <h2 className="section-title">Special Offers</h2>
          <div className="loading-state">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="special-offers">
      <div className="container">
        <h2 className="section-title">Special Offers</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
