import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../base/Button";
import Card from "../../base/Card";
import { fetchProducts, searchProduct } from "../../../services/product";
import Navbar from "../../base/Navbar";
import { useCart } from "../../../services/cartContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../../styles/ProductbyCat.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { addToCart } = useCart();

  const handleAddToCart = async (item) => {
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
        <div className="product-grid">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="custom-card">
              <h3 className="product-title">
                <Skeleton width={150} />
              </h3>
              <Skeleton height={180} />
              <p className="product-price">
                <Skeleton width={100} />
              </p>
              <div className="card-buttons">
                <Skeleton width={100} height={36} />
                <Skeleton width={100} height={36} />
              </div>
            </Card>
          ))}
        </div>
      ) : product.length === 0 ? (
        <p className="no-products">🛒 No products found. Try searching again!</p>
      ) : (
        <div className="product-grid">
          {product.map((product) => (
            <Card key={product.id} className="custom-card">
              <h3 className="product-title">{product.title}</h3>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
              <p className="product-price">Price: ${product.price}</p>
              <div className="card-buttons">
                <Link to={`/product/${product.id}`}>
                  <Button>Show Details</Button>
                </Link>
                <Button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
