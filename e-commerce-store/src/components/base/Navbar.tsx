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
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          🛍️ MyStore
        </Link>

        <button
          className="navbar-toggler"
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
            <li className="nav-item dropdown">
              <button
                className="btn nav-link dropdown-toggle fw-bold"
                id="categoryDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </button>

              <ul
                className="dropdown-menu glass-effect"
                aria-labelledby="categoryDropdown"
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

          <form className="d-flex me-3 search-form" onSubmit={handleSearch}>
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search products..."
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              className="btn search-button hover-lift" 
              type="submit"
            >
              🔍
            </button>
          </form>

          <div className="d-flex align-items-center">
            <Link to="/cart" className="position-relative me-3">
              <button
                className="btn cart-button hover-lift"
              >
                🛒
                {cartCount > 0 && (
                  <span className="cart-badge">
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
                    className="profile-avatar hover-lift"
                  />
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end profile-dropdown"
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
                  className="btn auth-button hover-lift"
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
