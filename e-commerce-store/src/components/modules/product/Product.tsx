import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../base/Button";
import { fetchProducts, searchProduct } from "../../../services/product";
import Navbar from "../../base/Navbar";
import { useCart } from "../../../services/cartContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../../styles/ProductEnhancedStyles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "../../../types";

const Products: React.FC = (): JSX.Element => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const { addToCart } = useCart();

  const handleAddToCart = async (item: Product): Promise<void> => {
    try {
      if (item) {
        addToCart(item);
        toast.success(`${item.title} added to cart!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Something went wrong adding to cart.");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");

    setLoading(true);

    if (query) {
      searchProduct(query)
        .then(setProduct)
        .catch((err) => console.error("Error searching products", err))
        .finally(() => setLoading(false));
    } else {
      fetchProducts()
        .then(setProduct)
        .catch((err) => console.error("Error loading products", err))
        .finally(() => setLoading(false));
    }
  }, [location.search]);

  return (
    <div className="product-category-page">
      <Navbar />
      <ToastContainer /> {/* 👈 Toast display container */}

      <h2 className="product-heading cursive-heading">
        Products {location.search ? "(Search Results)" : ""}
      </h2>

      {loading ? (
        <div className="skeleton-container">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <Skeleton className="skeleton-image" />
              <Skeleton className="skeleton-title" width={200} />
              <Skeleton className="skeleton-price" width={100} />
              <Skeleton className="skeleton-button" width={120} />
              <Skeleton className="skeleton-button" width={120} />
            </div>
          ))}
        </div>
      ) : product.length === 0 ? (
        <p className="no-products">🛒 No products found. Try searching again!</p>
      ) : (
        <div className="product-grid">
          {product.map((product) => (
            <div key={product.id} className="product-card">
              <h3 className="product-title">{product.title}</h3>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
              <p className="product-price">${product.price}</p>
              <div className="card-buttons">
                <Link to={`/product/${product.id}`}>
                  <button>Show Details</button>
                </Link>
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
