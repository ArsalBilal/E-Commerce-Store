import React, { useEffect, useState, ReactNode } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { refreshToken } from "../../services/auth";

interface SessionManagerProps {
  children: ReactNode;
}

export default function SessionManager({ children }: SessionManagerProps) {
  const [showWarning, setShowWarning] = useState(false);
  const [refresh] = useState<string | null>(localStorage.getItem("refreshToken"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = () => {
      const expiry = localStorage.getItem("sessionExpiry");
      const token = localStorage.getItem("authToken");

      if (token && expiry) {
        const timeLeft = parseInt(expiry) - Date.now();

        if (timeLeft <= 60000 && timeLeft > 0) {
          setShowWarning(true);
        }

        if (timeLeft <= 0) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    const interval = setInterval(checkSession, 5000);
    return () => clearInterval(interval);
  }, [navigate, location]);

  const handleExtendSession = async () => {
    const expiry = localStorage.getItem("sessionExpiry");

    if (!expiry || Date.now() > parseInt(expiry)) {
      alert("Session already expired. Please login again.");
      localStorage.clear();
      navigate("/login");
      return;
    }

    try {
      if (refresh === null) {
        throw new Error("No refresh token available");
      }
      const data = await refreshToken(refresh);
      const newExpiry = Date.now() + 10 * 60 * 1000;
      localStorage.setItem("authToken", data.accessToken);
      localStorage.setItem("sessionExpiry", newExpiry.toString());
      setShowWarning(false);
    } catch (err) {
      localStorage.clear();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setShowWarning(false);
    alert("You have been logged out due to inactivity.");
  };

  return (
    <>
      {children}

      {showWarning && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <p>Your session is about to expire. Do you want to stay logged in?</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "15px" }}>
              <button onClick={handleExtendSession} className="btn btn-success">
                Stay Logged In
              </button>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const overlayStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "20px 30px",
  borderRadius: "10px",
  maxWidth: "400px",
  textAlign: "center" as const,
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
};
