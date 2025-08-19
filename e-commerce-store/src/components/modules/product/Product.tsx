import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchProducts, searchProduct } from "../../../services/product";
import Navbar from "../../base/Navbar";
import { useCart } from "../../../services/cartContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../../styles/EnhancedCardStyles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "../../../types";
import ProductCard from "../homepage/ProductCard";
import "../../../styles/ProductEnhancedStyles.css";

const Products: React.FC = (): JSX.Element => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const { addToCart } = useCart();

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
    <div>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="product-category-page">
      
      <h2 className="product-heading cursive-heading" >
        Products {location.search ? "(Search Results)" : ""}
      </h2>

      {loading ? (
        <div className="products-grid">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="product-card newarrival-product-card">
              <Skeleton height={180} style={{ marginBottom: "15px" }} />
              <Skeleton width={150} style={{ marginBottom: "10px" }} />
              <Skeleton width={100} style={{ marginBottom: "15px" }} />
              <Skeleton width={120} height={30} />
            </div>
          ))}
        </div>
      ) : product.length === 0 ? (
        <p className="no-products">🛒 No products found. Try searching again!</p>
      ) : (
        <div className="products-grid">
          {product.map((product) => (
            <ProductCard key={product.id} product={product} section="newarrival" />
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Products;
