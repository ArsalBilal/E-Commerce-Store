import React, { useEffect, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategories } from "../../services/product";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../../services/cartContext";
import "../../styles/Navbar.css"; 

export default function Navbar() {
  const [categories, setCategories] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to fetch categories", err));

    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text" to="/">
          🛍️ MyStore
        </Link>

        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown" style={{ position: "relative" }}>
              <button
                className="btn nav-link dropdown-toggle text-dark fw-bold"
                id="categoryDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </button>

              <ul
                className="dropdown-menu"
                aria-labelledby="categoryDropdown"
                style={{
                  position: "absolute",
                  maxHeight: "500px",
                  overflowY: "auto",
                  top: "100%",
                  left: 0,
                  right: "auto",
                }}
              >
                {Array.isArray(categories) &&
                  categories.map((cat, i) =>
                    typeof cat === "string" ? (
                      <li key={i}>
                        <Link
                          className="dropdown-item text-capitalize"
                          to={`/categories/${cat}`}
                        >
                          {cat.replace(/-/g, " ")}
                        </Link>
                      </li>
                    ) : null
                  )}
              </ul>
            </li>
          </ul>

          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              className="btn" 
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #0FA4AF 0%, #095258db 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 12px',
                cursor: 'pointer'
              }}
            >
              🔍
            </button>
          </form>

          <div className="d-flex ">
            <Link to="/cart" className="position-relative">
              <button
                className="btn btn-dark position-relative d-flex align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginTop: "7px",
                  marginRight: "9px",
                  fontSize: "1.2rem",
                }}
              >
                🛒
                {cartCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{
                      fontSize: "0.7rem",
                      padding: "2px 6px",
                      transform: "translate(-40%, -50%)",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>

            {isLoggedIn ? (
              <div className="dropdown">
                <button
                  className="btn d-flex align-items-center border-0 bg-transparent"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/035/624/082/non_2x/user-profile-person-icon-in-flat-isolated-in-suitable-for-social-media-man-profiles-screensavers-depicting-male-face-silhouettes-for-apps-website-vector.jpg"
                    alt="Profile"
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end shadow"
                  aria-labelledby="profileDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/my-products">
                      My Products
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <button 
                  className="btn" 
                  style={{ 
                    marginTop: "7px",
                    background: 'linear-gradient(135deg, #0FA4AF 0%, #095258db 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    cursor: 'pointer'
                  }}
                >
                  🔐 Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
