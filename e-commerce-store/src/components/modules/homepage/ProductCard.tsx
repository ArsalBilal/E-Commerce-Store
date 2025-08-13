import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types';
import { useCart } from '../../../services/cartContext';
import "../../../styles/homepage.css";

interface ProductCardProps {
  product: Product;
  badge?: 'new' | 'sale' | 'bestseller';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, badge }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const discount = product.discountPercentage || 0;
  const originalPrice = discount > 0 ? (product.price / (1 - discount / 100)).toFixed(2) : null;

  return (
    <div className="product-card elegant-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          {badge && (
            <span className={`product-badge ${badge}`}>
              {badge === 'sale' ? `${Math.round(discount)}% OFF` : badge.toUpperCase()}
            </span>
          )}
          <button 
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={toggleWishlist}
            aria-label="Add to wishlist"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <img 
            src={product.thumbnail || 'https://via.placeholder.com/300x300'} 
            alt={product.title} 
            className="product-img"
            loading="lazy"
          />
          <div className="product-overlay">
            <div className="overlay-actions">
              <button className="action-btn quick-view" aria-label="Quick view">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
              <button className="action-btn compare" aria-label="Compare">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="product-info">
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.round(product.rating || 0) ? "#FFD700" : "none"} stroke="#FFD700" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
            <span className="rating-count">({product.rating || 0})</span>
          </div>
          <h3 className="product-name">{product.title}</h3>
          <p className="product-description">{product.description?.substring(0, 60)}...</p>
          <div className="product-price-container">
            <span className="current-price">${product.price}</span>
            {originalPrice && (
              <span className="original-price">${originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="product-actions">
        <button 
          className="add-to-cart-btn elegant-btn" 
          onClick={handleAddToCart}
          aria-label={`Add ${product.title} to cart`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
