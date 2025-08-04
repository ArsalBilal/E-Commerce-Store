import React, { useEffect, useState } from "react";
import "../../../styles/cart.css";
import Navbar from "../../base/Navbar";
import { useCart } from "../../../services/cartContext";
import { Link } from "react-router-dom";
import { handleCheckout } from "../../../services/checkout";

const Cart: React.FC = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartCount,
  } = useCart();

  const [loading, setLoading] = useState<boolean>(true);

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

  const renderSkeletonItem = (count = 2) =>
    Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="d-flex flex-column flex-md-row align-items-start border-bottom pb-4 mb-4"
      >
        <div
          className="skeleton-box"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "10px",
            background: "#e0e0e0",
            marginBottom: "1rem",
          }}
        ></div>
        <div className="ms-md-4 flex-grow-1 w-100">
          <div className="skeleton-line mb-2" style={{ width: "60%" }}></div>
          <div className="skeleton-line mb-2" style={{ width: "40%" }}></div>
          <div className="skeleton-line mb-3" style={{ width: "30%" }}></div>
          <div className="skeleton-line" style={{ width: "50%" }}></div>
        </div>
      </div>
    ));

  const renderSkeletonSummary = () => (
    <div className="p-3 rounded shadow-sm" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="skeleton-line mb-2" style={{ width: "70%" }}></div>
      <div className="skeleton-line mb-2" style={{ width: "50%" }}></div>
      <div className="skeleton-line mb-2" style={{ width: "100%" }}></div>
      <div className="skeleton-line mb-3" style={{ width: "100%" }}></div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="container py-4">
         <h2 className="product-heading cursive-heading">
          Your Cart ({cartCount})
        </h2>

        <div className="row gy-4">
          <div className="col-12 col-md-8">
            {loading
              ? renderSkeletonItem(2)
              : cartItems.length === 0
              ? <p>No items in cart</p>
              : cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex flex-column flex-md-row align-items-start border-bottom pb-4 mb-4"
                  >
                    <img
                      src={item.thumbnail || "https://via.placeholder.com/120"}
                      alt={item.title}
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        marginBottom: "1rem",
                      }}
                    />
                    <div className="ms-md-4 flex-grow-1">
                      <h5 className="mb-1 fw-semibold">{item.title}</h5>
                      <p className="text-muted mb-2">Price: ${item.price}</p>

                      <div className="d-flex align-items-center flex-wrap gap-2">
                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          −
                        </button>
                        <span style={{ minWidth: "30px", textAlign: "center" }}>
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>

                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>

                      <p className="mt-2 fw-bold">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
          </div>

          <div className="col-12 col-md-4">
            {loading ? (
              renderSkeletonSummary()
            ) : (
              <div
                className="p-3 rounded shadow-sm"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-between">
                  <p className="fw-bold">Subtotal</p>
                  <p className="fw-bold">${totalPrice.toFixed(2)}</p>
                </div>
                <p className="text-muted" style={{ fontSize: "13px" }}>
                  Taxes and shipping calculated at checkout
                </p>

                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Add promo code"
                  style={{ fontSize: "14px" }}
                />

                <div className="d-grid gap-2 mt-3">
                  <button className="btn btn-outline-dark">UPDATE</button>
                  <button
                    className="btn btn-dark"
                    onClick={() => handleCheckout(cartItems)}
                  >
                    CHECKOUT
                  </button>
                </div>

                <Link
                  to="/"
                  className="d-block text-center mt-4"
                  style={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "royalblue",
                  }}
                >
                  ← Back to Shop
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
