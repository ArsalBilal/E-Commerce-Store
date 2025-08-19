import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({ children, onClick, style, type = "button", className = "" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #0FA4AF 0%, #095258db 100%)',
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
