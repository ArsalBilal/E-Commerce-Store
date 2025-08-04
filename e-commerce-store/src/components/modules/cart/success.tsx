import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../base/Navbar";
import "../../../styles/success.css";

const Success: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="success-container">
        <h1 className="success-title">🎉 Payment Successful!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order is being processed.
        </p>
        <Link to="/" className="success-button">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default Success;
