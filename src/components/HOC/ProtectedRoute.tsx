import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
interface ProtectedRouteProps {
  Element: React.ElementType;
  isLoggedIn: boolean;
  userId?: string;
}

const ProtectedRoute = ({
  Element,
  isLoggedIn,
  userId,
}: ProtectedRouteProps): JSX.Element | null => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sing-up", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Element userId={userId ? userId : null} /> : null;
};

export default ProtectedRoute;
