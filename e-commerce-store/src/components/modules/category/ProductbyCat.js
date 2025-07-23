import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByCategory } from "../../../services/product";
import Button from "../../base/Button";
import Card from "../../base/Card";
import Navbar from "../../base/Navbar";
import "../../../styles/ProductbyCat.css";
import { useCart } from "../../../services/cartContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductbyCat() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  const handleAddToCart = async (item) => {
    try {
      if (item) {
        addToCart(item);
        toast.success(`${item.title} added to cart successfully!`, {
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
    setLoading(true);
    fetchProductByCategory(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="product-category-page">
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="product-heading cursive-heading">
        Products in {id.replace(/-/g, " ")}
      </h2>

      {loading ? (
        <div className="product-grid">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="product-card">
              <h3 className="product-title">
                <Skeleton width={150} />
              </h3>
              <Skeleton height={180} />
              <p className="product-price">
                <Skeleton width={100} />
              </p>
              <div className="product-buttons">
                <Skeleton width={100} height={36} style={{ marginRight: "10px" }} />
                <Skeleton width={100} height={36} />
              </div>
            </Card>
          ))}
        </div>
      ) : product.length === 0 ? (
        <p className="no-products">No products found in this category.</p>
      ) : (
        <div className="product-grid">
          {product.map((product) => (
            <Card key={product.id} className="product-card">
              <h3 className="product-title">{product.title}</h3>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
              <p className="product-price">Price: ${product.price}</p>
              <div className="product-buttons">
                <Link to={`/product/${product.id}`}>
                  <Button>Show Details</Button>
                </Link>
                <Button
                  style={{ marginLeft: "5px" }}
                  onClick={() => handleAddToCart(product)}
                >
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
