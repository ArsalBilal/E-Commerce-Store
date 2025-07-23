import React from "react";
import "../../styles/Card.css";

export default function Card({ children, style }) {
  return (
    <div className="custom-card" style={style}>
      {children}
    </div>
  );
}
