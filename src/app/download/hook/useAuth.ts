"use client";

import { useState, useEffect } from "react";

/**
 * Decode a JWT payload (base64url) without external dependencies.
 * This is intended to run in the browser (atob available).
 */
function decodeJwt<T = unknown>(token: string): T {
  const parts = token.split(".");
  if (parts.length < 2) {
    throw new Error("Invalid JWT token");
  }
  const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const padded = payload + "=".repeat((4 - (payload.length % 4)) % 4);
  try {
    const decoded = atob(padded);
    return JSON.parse(decoded) as T;
  } catch {
    throw new Error("Failed to decode JWT payload");
  }
}

interface DecodedToken {
  id: string;
  username: string;
  rol: "admin" | "cliente";
  exp: number;
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);

  // Leer token al iniciar
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = decodeJwt<DecodedToken>(savedToken);

        // Si está expirado → borrarlo
        if (decoded.exp * 1000 < Date.now()) {
          logout();
          return;
        }

        setToken(savedToken);
        setUser(decoded);
      } catch {
        logout();
      }
    }
  }, []);

  const saveToken = (newToken: string) => {
  localStorage.setItem("token", newToken);

  const decoded = decodeJwt<DecodedToken>(newToken);
  setToken(newToken);
  setUser(decoded);

  console.log("Token y rol guardados en cookies");
};

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Requests autenticadas
  const authFetch = async (url: string, options: RequestInit = {}) => {
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    return fetch(url, { ...options, headers });
  };

  return {
    token,
    user,
    isLogged: !!user,
    isAdmin: user?.rol === "admin",
    saveToken,
    logout,
    authFetch,
  };
}
