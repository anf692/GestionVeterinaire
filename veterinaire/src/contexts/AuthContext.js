import { createContext, useState } from "react";
import { loginUser, logoutUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password);
      if (response) {
        setUser(response.user || { username });
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Erreur de connexion",
      };
    }
  };
  

  const logout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.warn("Erreur lors de la déconnexion :", e.message);
    }
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
