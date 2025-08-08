export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      bold: number;
    };
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    none: string;
    sm: string;
    md: string;
    lg: string;
  };
}

export const defaultTokens: DesignTokens = {
  colors: {
    primary: "#4CAF50",
    secondary: "#2196F3",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    background: "#FFFFFF",
    surface: "#F5F5F5",
    text: "#212121",
    textSecondary: "#757575",
    border: "#E0E0E0",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    fontSize: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "20px",
      xl: "24px",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  borderRadius: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    full: "9999px",
  },
  shadows: {
    none: "none",
    sm: "0 1px 3px rgba(0, 0, 0, 0.12)",
    md: "0 4px 6px rgba(0, 0, 0, 0.12)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.12)",
  },
};

export const createTokens = (customTokens?: Partial<DesignTokens>): DesignTokens => {
  if (!customTokens) return defaultTokens;

  return {
    colors: { ...defaultTokens.colors, ...customTokens.colors },
    spacing: { ...defaultTokens.spacing, ...customTokens.spacing },
    typography: { ...defaultTokens.typography, ...customTokens.typography },
    borderRadius: { ...defaultTokens.borderRadius, ...customTokens.borderRadius },
    shadows: { ...defaultTokens.shadows, ...customTokens.shadows },
  };
};
