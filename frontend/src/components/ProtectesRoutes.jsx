import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import { useState, useEffect } from "react";

function ProtectesRoutes({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth();
    }, []);

    const refreshToken = async () => {
        const refresh = localStorage.getItem("refresh");
        if (!refreshToken) {
            handleLogout();
            return;
        }

        try {
            const res = await api.post("/api/token/refresh/", { refresh });
            if (res.status === 200) {
                localStorage.setItem("access", res.data.access);
                setIsAuthorized(true);
            } else {
                handleLogout();
            }
        } catch (error) {
            console.log("Failed to refresh token:", error);
            handleLogout();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsAuthorized(false);
    };

    const auth = async () => {
        const token = localStorage.getItem("access");
        if (!token) {
            handleLogout();
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectesRoutes;
