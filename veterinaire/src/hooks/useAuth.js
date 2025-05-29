// useAuth.js
import { useState, useEffect, useCallback, createContext, useContext } from "react"

const AuthContext = createContext()

const API_BASE = "https://api.example.com" // à adapter à ton backend

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"))
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh_token"))
  const [user, setUser] = useState(null)

  const saveTokens = (access, refresh) => {
    setAccessToken(access)
    setRefreshToken(refresh)
    localStorage.setItem("access_token", access)
    localStorage.setItem("refresh_token", refresh)
  }

  const clearTokens = () => {
    setAccessToken(null)
    setRefreshToken(null)
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
  }

  const fetchUser = useCallback(async () => {
    if (!accessToken) return
    try {
      const res = await fetch(`${API_BASE}/auth/me/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      if (!res.ok) throw new Error("Unauthorized")
      const data = await res.json()
      setUser(data)
    } catch (err) {
      console.error("Fetch user failed", err)
      setUser(null)
    }
  }, [accessToken])

  const login = async (username, password) => {
    const res = await fetch(`${API_BASE}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    if (!res.ok) throw new Error("Échec de la connexion")

    const data = await res.json()
    saveTokens(data.access, data.refresh)
    await fetchUser()
  }

  const logout = () => {
    clearTokens()
    setUser(null)
  }

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) {
      logout()
      return
    }
    try {
      const res = await fetch(`${API_BASE}/auth/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      })
      if (!res.ok) throw new Error("Refresh token invalide")

      const data = await res.json()
      saveTokens(data.access, refreshToken)
      return data.access
    } catch (err) {
      logout()
    }
  }, [refreshToken])

  // Vérifie le token et récupère l'utilisateur au démarrage
  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        refreshAccessToken,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
