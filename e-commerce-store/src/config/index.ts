export interface AppConfig {
  api: {
    baseURL: string;
    timeout: number;
    retryAttempts: number;
  };
  stripe: {
    publishableKey: string;
    secretKey: string;
  };
  features: {
    enableAnalytics: boolean;
    enableNotifications: boolean;
    enableSessionWarning: boolean;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

const defaultConfig: AppConfig = {
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || "https://dummyjson.com/",
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || "10000"),
    retryAttempts: parseInt(process.env.REACT_APP_API_RETRY_ATTEMPTS || "3"),
  },
  stripe: {
    publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "",
    secretKey: process.env.REACT_APP_STRIPE_SECRET_KEY || "",
  },
  features: {
    enableAnalytics: process.env.REACT_APP_ENABLE_ANALYTICS === "true",
    enableNotifications: process.env.REACT_APP_ENABLE_NOTIFICATIONS !== "false",
    enableSessionWarning: process.env.REACT_APP_ENABLE_SESSION_WARNING !== "false",
  },
  theme: {
    primaryColor: process.env.REACT_APP_THEME_PRIMARY_COLOR || "#4CAF50",
    secondaryColor: process.env.REACT_APP_THEME_SECONDARY_COLOR || "#2196F3",
    fontFamily: process.env.REACT_APP_THEME_FONT_FAMILY || "Arial, sans-serif",
  },
};

export const getConfig = (): AppConfig => {
  return {
    ...defaultConfig,
    // Allow runtime configuration override
    ...(window as any).__APP_CONFIG__ || {},
  };
};

export default getConfig;
