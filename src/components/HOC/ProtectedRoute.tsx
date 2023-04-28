import React,{useEffect} from 'react';
import {Navigate, useNavigate,} from 'react-router-dom';
interface ProtectedRouteProps {
    Element: React.ElementType;
    isLoggedIn: boolean;
}

const ProtectedRoute = ({ Element, isLoggedIn }: ProtectedRouteProps): JSX.Element | null => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/sing-up', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? <Element /> : null;
};


export default ProtectedRoute;