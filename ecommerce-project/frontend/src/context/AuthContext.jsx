import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch (error) {
            localStorage.removeItem("user");
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        localStorage.setItem("token", userToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const isAuthenticated = Boolean(token);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}