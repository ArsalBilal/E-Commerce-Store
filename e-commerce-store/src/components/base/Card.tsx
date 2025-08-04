import React, { ReactNode, CSSProperties } from "react";
import "../../styles/Card.css";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function Card({ children, style }: CardProps) {
  return (
    <div className="custom-card" style={style}>
      {children}
    </div>
  );
}
