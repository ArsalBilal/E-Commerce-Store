import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { NotificationManager } from 'react-notifications';

export default function RedirectWithToast() {
  const [showRedirect, setShowRedirect] = useState(false);
  const location = useLocation();

  useEffect(() => {
    NotificationManager.warning('Login first to check cart', 'Close after 3000ms', 3000);
    console.log("Login first to check cart");

    const timer = setTimeout(() => {
      setShowRedirect(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showRedirect) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <div style={{ height: "100vh" }}></div>;
}
