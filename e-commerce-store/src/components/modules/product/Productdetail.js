import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../../../services/product";
import Button from "../../base/Button";
import Navbar from "../../base/Navbar";
import { useCart } from "../../../services/cartContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading product", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    try {
      if (product) {
        addToCart(product);
        toast.success(`${product.title} added to cart!`, {
          position: "top-right",
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Something went wrong adding to cart.", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="container mt-4">
        <div
          className="card mb-3 shadow"
          style={{ maxWidth: "1000px", margin: "auto", position: "relative" }}
        >
          <button
            onClick={handleGoBack}
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "none",
              border: "none",
              fontSize: "20px",
              fontWeight: "bold",
              color: "black",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>

          <div className="row g-0 pt-4">
            <div className="col-md-4 d-flex align-items-center">
              {loading ? (
                <Skeleton height={250} width={"100%"} />
              ) : (
                <img
                  src={product.thumbnail}
                  className="img-fluid rounded-start"
                  alt={product.title}
                  style={{
                    padding: "10px",
                    objectFit: "cover",
                    maxHeight: "300px",
                  }}
                />
              )}
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {loading ? <Skeleton width={200} /> : product.title}
                </h5>
                <p className="card-text">
                  {loading ? <Skeleton count={3} /> : product.description}
                </p>
                <p className="card-text">
                  <strong>Price:</strong>{" "}
                  {loading ? <Skeleton width={80} /> : `$${product.price}`}
                </p>
                <p className="card-text">
                  <strong>Category:</strong>{" "}
                  {loading ? <Skeleton width={100} /> : product.category}
                </p>
                <p className="card-text">
                  <strong>Brand:</strong>{" "}
                  {loading ? <Skeleton width={100} /> : product.brand}
                </p>
                <p className="card-text">
                  <strong>Discount:</strong>{" "}
                  {loading ? (
                    <Skeleton width={60} />
                  ) : (
                    `${product.discountPercentage}%`
                  )}
                </p>
                <p className="card-text">
                  <strong>Stock:</strong>{" "}
                  {loading ? <Skeleton width={50} /> : product.stock}
                </p>
                <p className="card-text">
                  <small className="text-muted">Last updated just now</small>
                </p>

                {!loading && (
                  <Button
                    onClick={handleAddToCart}
                    style={{ backgroundColor: "black", color: "#fff" }}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
