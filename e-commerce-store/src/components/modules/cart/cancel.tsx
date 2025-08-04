import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../base/Navbar";
import "../../../styles/cancel.css";

const Cancel: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="cancel-container">
        <h1 className="cancel-title">❌ Payment Cancelled</h1>
        <p className="cancel-message">
          Your transaction was not completed. You can try again or browse more products.
        </p>
        <Link to="/" className="cancel-button">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default Cancel;
