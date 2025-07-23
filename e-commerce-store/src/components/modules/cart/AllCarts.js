import React, { useEffect, useState } from "react";
import "../../../styles/cart.css";
import Navbar from "../../base/Navbar";
import { getAllCarts } from "../../../services/cart";

export default function AllCart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = 1; 
   useEffect(() => {
      getAllCarts(userId)
        .then((data) => {
          if (data?.carts?.length > 0) {
            setCart(data.carts[0]);
          } else {
            setCart(null);
          }
        })
        .catch((err) => console.error("Failed to load cart:", err))
        .finally(() => setLoading(false));
    }, [userId]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <p className="text-center mt-5">Loading cart...</p>
      </div>
    );
  }

  if (!cart) {
    return (
      <div>
        <Navbar />
        <p className="text-center mt-5">No items found in your cart.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <section className="cart-section">
        <div className="container cart-container">
          <div className="card cart-card">
            <div className="row">
              {/* LEFT SIDE */}
              <div className="col-lg-6 col-12 cart-left">
                <h3 className="cart-title">Your Products</h3>
                {cart.products.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img
                      src={item.thumbnail || "https://via.placeholder.com/100"}
                      alt={item.title}
                      className="cart-img"
                    />
                    <div className="cart-item-details">
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="text-primary">{item.title}</h5>
                        <button className="btn-close"></button>
                      </div>
                      <p className="text-muted">Qty: {item.quantity}</p>
                      <div className="cart-qty-price">
                        <span className="fw-bold">${item.total}</span>
                        <div className="cart-qty-controls">
                          <button>-</button>
                          <input type="number" value={item.quantity} readOnly />
                          <button>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <hr />
                <div className="cart-summary">
                  <p>Total Products: <strong>{cart.totalProducts}</strong></p>
                  <p>Total Quantity: <strong>{cart.totalQuantity}</strong></p>
                  <div className="total-price">
                    <span>Total:</span>
                    <strong>${cart.total}</strong>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-lg-6 col-12 cart-right">
                <h3 className="cart-title">Payment</h3>
                <form>
                  <label>Card Number</label>
                  <input type="text" className="form-control" defaultValue="1234 5678 9012 3457" />

                  <label>Name on Card</label>
                  <input type="text" className="form-control" defaultValue="John Smith" />

                  <div className="row">
                    <div className="col-6">
                      <label>Expiration</label>
                      <input type="text" className="form-control" defaultValue="01/26" />
                    </div>
                    <div className="col-6">
                      <label>CVV</label>
                      <input type="password" className="form-control" defaultValue="123" />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Buy Now
                  </button>

                  <p className="mt-4 text-center">
                    <a href="/">← Back to Shopping</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
