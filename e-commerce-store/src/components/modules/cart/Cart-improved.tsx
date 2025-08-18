import React, { useEffect, useState } from "react";
import "../../../styles/cart.css";
import Navbar from "../../base/Navbar";
import { useCart } from "../../../services/cartContext";
import { Link } from "react-router-dom";
import { handleCheckout } from "../../../services/checkout";

const CartImproved: React.FC = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartCount,
  } = useCart();

  const [loading, setLoading] = useState<boolean>(true);
  const [promoCode, setPromoCode] = useState<string>("");
  const [isApplyingPromo, setIsApplyingPromo] = useState<boolean>(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(delay);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum: number, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost = totalPrice > 50 ? 0 : 5.99;
  const taxAmount = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + taxAmount;

  const renderSkeletonItem = (count = 2) =>
    Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="cart-item-skeleton card mb-4 border-0 shadow-sm"
      >
        <div className="row g-0">
          <div className="col-md-3">
            <div 
              className="skeleton-box rounded-start"
              style={{
                width: "100%",
                height: "200px",
                background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0e0 75%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite"
              }}
            />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <div className="skeleton-line mb-3" style={{ width: "70%", height: "24px" }}></div>
              <div className="skeleton-line mb-2" style={{ width: "40%", height: "16px" }}></div>
              <div className="skeleton-line mb-3" style={{ width: "30%", height: "20px" }}></div>
              <div className="skeleton-line" style={{ width: "50%", height: "40px" }}></div>
            </div>
          </div>
        </div>
      </div>
    ));

  const renderSkeletonSummary = () => (
    <div className="order-summary-skeleton card border-0 shadow-sm">
      <div className="card-body">
        <div className="skeleton-line mb-4" style={{ width: "60%", height: "24px" }}></div>
        <div className="skeleton-line mb-3" style={{ width: "100%", height: "16px" }}></div>
        <div className="skeleton-line mb-3" style={{ width: "80%", height: "16px" }}></div>
        <div className="skeleton-line mb-3" style={{ width: "90%", height: "16px" }}></div>
        <div className="skeleton-line mb-4" style={{ width: "100%", height: "40px" }}></div>
      </div>
    </div>
  );

  const EmptyCartState = () => (
    <div className="empty-cart-container text-center py-5">
      <div className="empty-cart-animation mb-4">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="empty-cart-svg">
          <circle cx="100" cy="100" r="90" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="2"/>
          <path d="M60 80 L140 80 L130 130 L70 130 Z" fill="#dee2e6" stroke="#ced4da" strokeWidth="2"/>
          <circle cx="80" cy="110" r="8" fill="#6c757d"/>
          <circle cx="120" cy="110" r="8" fill="#6c757d"/>
          <path d="M70 60 L75 50 L125 50 L130 60" stroke="#adb5bd" strokeWidth="2"/>
        </svg>
      </div>
      <h3 className="mb-3 fw-bold">Your cart is empty</h3>
      <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
      <Link to="/" className="btn btn-primary btn-lg px-5">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
          <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Start Shopping
      </Link>
    </div>
  );

  return (
    <div className="cart-page bg-light">
      <Navbar />
      <div className="container py-5">
        <div className="cart-header text-center mb-5">
          <h1 className="display-5 fw-bold text-primary mb-3">
            Shopping Cart
          </h1>
          <p className="lead text-muted">
            {cartCount === 0 
              ? "Your cart is empty" 
              : `${cartCount} item${cartCount !== 1 ? 's' : ''} in your cart`
            }
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            {loading ? (
              <div className="cart-items-loading">
                {renderSkeletonItem(2)}
              </div>
            ) : cartItems.length === 0 ? (
              <EmptyCartState />
            ) : (
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item card mb-4 border-0 shadow-sm hover-lift"
                    style={{ transition: 'transform 0.2s ease-in-out' }}
                  >
                    <div className="row g-0">
                      <div className="col-md-3">
                        <div className="position-relative">
                          <img
                            src={item.thumbnail || "https://via.placeholder.com/300x300/6c757d/ffffff?text=No+Image"}
                            alt={item.title}
                            className="img-fluid rounded-start"
                            style={{
                              height: "200px",
                              objectFit: "cover",
                              width: "100%",
                            }}
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/300x300/6c757d/ffffff?text=No+Image";
                            }}
                          />
                          <span className="badge bg-primary position-absolute top-0 start-0 m-2">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h5 className="card-title fw-bold mb-1">{item.title}</h5>
                              <p className="text-muted small mb-2">
                                ${item.price.toFixed(2)} each
                              </p>
                            </div>
                            <button
                              className="btn btn-sm btn-outline-danger border-0"
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove item"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="quantity-selector">
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => decreaseQuantity(item.id)}
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                              </button>
                              <span className="mx-2 fw-bold">{item.quantity}</span>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => increaseQuantity(item.id)}
                                aria-label="Increase quantity"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                              </button>
                            </div>
                            
                            <div className="text-end">
                              <p className="mb-0 text-muted small">Subtotal</p>
                              <p className="mb-0 fw-bold fs-5">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-4">
            <div className="order-summary card border-0 shadow-sm sticky-top" style={{ top: '100px' }}>
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0 fw-bold">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="fw-bold">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? "text-success" : "text-muted"}>
                    {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Taxes</span>
                  <span className="text-muted">${taxAmount.toFixed(2)}</span>
                </div>
                
                {shippingCost === 0 && totalPrice > 0 && (
                  <div className="alert alert-success py-2 mb-3">
                    <small>Free shipping on orders over $50!</small>
                  </div>
                )}
                
                <div className="mb-3">
                  <label className="form-label small">Promo Code</label>
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button 
                      className="btn btn-outline-secondary"
                      type="button"
                      disabled={isApplyingPromo}
                    >
                      Apply
                    </button>
                  </div>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold fs-4">${finalTotal.toFixed(2)}</span>
                </div>
                
                <button
                  className="btn btn-primary w-100 mb-2"
                  onClick={() => handleCheckout(cartItems)}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
                
                <Link
                  to="/"
                  className="btn btn-outline-secondary w-100"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartImproved;
