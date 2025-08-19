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
import { Product } from "../../../types";
import "../../../styles/ProductDetailStyles.css";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    if (id) {
      const productId = Number(id);
      fetchProductById(productId)
        .then((data) => {
          setProduct(data);
          setSelectedImage(data.thumbnail);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading product", err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleAddToCart = (): void => {
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

  const handleGoBack = (): void => {
    navigate(-1);
  };

  const getStockStatus = (stock?: number): { status: string; className: string } => {
    if (!stock || stock === 0) return { status: "Out of Stock", className: "out-of-stock" };
    if (stock < 10) return { status: `Only ${stock} left`, className: "low-stock" };
    return { status: "In Stock", className: "in-stock" };
  };

  const renderStars = (rating?: number) => {
    const safeRating = rating || 0;
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < Math.floor(safeRating) ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="product-detail-container ">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <Navbar />
        <div className="product-detail-wrapper">
          <div className="text-center">
            <h2>Product not found</h2>
            <Button onClick={handleGoBack}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.stock);
  const discountAmount = product.discountPercentage 
    ? Math.round(product.price * (product.discountPercentage / 100))
    : 0;
  const originalPrice = product.price + discountAmount;

  return (
    <div>
      <Navbar />
      <div className="product-detail-container">
      <ToastContainer />
      
      <button className="back-button" onClick={handleGoBack}>
        ←Back
      </button>

      <div className="product-detail-wrapper">
        <div className="product-detail-card">
          <div className="product-detail-grid">
            {/* Image Section */}
            <div className="product-image-section">
              <div>
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="product-main-image"
                />
                {product.images && product.images.length > 1 && (
                  <div className="image-gallery">
                    {product.images.slice(0, 4).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className={`gallery-thumbnail ${selectedImage === image ? "active" : ""}`}
                        onClick={() => setSelectedImage(image)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="product-info-section">
              <div className="product-header">
                <h1 className="product-title">{product.title}</h1>
                {product.brand && <p className="product-brand">by {product.brand}</p>}
                <span className="product-category-badge">{product.category}</span>
              </div>

              <div className="product-rating">
                <div className="rating-stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">
                  {product.rating ? product.rating.toFixed(1) : "0.0"} out of 5 stars
                </span>
              </div>

              <div className="price-section">
                <span className="current-price">${product.price.toFixed(2)}</span>
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <>
                    <span className="original-price">${originalPrice.toFixed(2)}</span>
                    <span className="discount-badge">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="product-description">{product.description}</p>

              <div className="product-specs">
                <h3 className="specs-title">Product Details</h3>
                <div className="specs-grid">
                  {product.brand && (
                    <div className="spec-item">
                      <span className="spec-label">Brand</span>
                      <span className="spec-value">{product.brand}</span>
                    </div>
                  )}
                  <div className="spec-item">
                    <span className="spec-label">Category</span>
                    <span className="spec-value">{product.category}</span>
                  </div>
                  {product.stock && (
                    <div className="spec-item">
                      <span className="spec-label">Stock</span>
                      <span className="spec-value">{product.stock} units</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="stock-status">
                <div className={`stock-indicator ${stockStatus.className}`}></div>
                <span className="stock-text">{stockStatus.status}</span>
              </div>

              <div className="action-buttons ">
                <button
                  className="btn btn-primary button-color"
                  onClick={handleAddToCart}
                  disabled={!product.stock || product.stock === 0}
                >
                  🛒 Add to Cart
                </button>
                <button className="btn btn-secondary">
                  ♡ Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetails;
