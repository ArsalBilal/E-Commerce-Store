import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../../services/product';
import ProductCard from './ProductCard';
import { Product } from '../../../types';
import "../../../styles/homepage.css";


const BestSellers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBestSellers = async () => {
      try {
        const data = await fetchProducts();
        // Assuming best sellers are top rated or sorted by rating
        const bestSellers = data
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 8);
        setProducts(bestSellers);
      } catch (error) {
        console.error('Error loading best sellers:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBestSellers();
  }, []);

  if (loading) {
    return (
      <section className="best-sellers">
        <div className="container">
          <h2 className="section-title">Best Sellers</h2>
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
    <section className="best-sellers">
      <div className="container">
        <h2 className="section-title">Best Sellers</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} badge="bestseller" section="bestseller" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
