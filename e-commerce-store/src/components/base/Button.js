import React from 'react';

export default function Button({ children, onClick, style, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={typeof onClick === "function" ? onClick : undefined}
      style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '6px 12px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        ...style,
      }}
      className={className}
    >
      {children}
    </button>
  );
}
