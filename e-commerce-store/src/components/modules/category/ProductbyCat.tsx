import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductByCategory } from "../../../services/product";
import Navbar from "../../base/Navbar";
import { useCart } from "../../../services/cartContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "../../../types";
import ProductCard from "../homepage/ProductCard";

const ProductbyCat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetchProductByCategory(id)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div className="product-category-page">
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="product-heading cursive-heading" style={{ textAlign: 'center' }}>
        Products in {id ? id.replace(/-/g, " ") : ""}
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
        <p className="no-products">No products found in this category.</p>
      ) : (
        <div className="products-grid">
          {product.map((product) => (
            <ProductCard key={product.id} product={product} section="newarrival" />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductbyCat;
