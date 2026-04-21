import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("taskforge_token");

        if (!token) {
            setIsLoading(false);
            return;
        }

        getCurrentUser()
            .then((response) => {
                setUser(response.user);
            })
            .catch(() => {
                localStorage.removeItem("taskforge_token");
                setUser(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const login = useCallback(async (credentials) => {
        const response = await loginUser(credentials);
        localStorage.setItem("taskforge_token", response.token);
        setUser(response.user);
        return response;
    }, []);

    const logout = useCallback(async () => {
        try {
            await logoutUser();
        } catch {
        }

        localStorage.removeItem("taskforge_token");
        setUser(null);
    }, []);

    const value = useMemo(
        () => ({
            user,
            setUser,
            login,
            logout,
            isAuthenticated: Boolean(user),
            isLoading,
        }),
        [user, isLoading, login, logout],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
};
