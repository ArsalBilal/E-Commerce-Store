import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../../services/product';
import ProductCard from './ProductCard';
import { Product } from '../../../types';
import "../../../styles/homepage.css";

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewArrivals = async () => {
      try {
        const data = await fetchProducts();
        // Assuming new arrivals are the latest products (sorted by ID or date)
        const newArrivals = data.slice(0, 8);
        setProducts(newArrivals);
      } catch (error) {
        console.error('Error loading new arrivals:', error);
      } finally {
        setLoading(false);
      }
    };
    loadNewArrivals();
  }, []);

  if (loading) {
    return (
      <section className="new-arrivals">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
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
    <section className="new-arrivals">
      <div className="container">
        <h2 className="section-title">New Arrivals</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} badge="new" section="newarrival" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
