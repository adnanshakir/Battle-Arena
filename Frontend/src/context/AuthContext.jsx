import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getMeAPI, loginAPI, logoutAPI, registerAPI } from "../api/auth.api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hydrateUser = useCallback(async () => {
    try {
      const response = await getMeAPI();
      const resolvedUser = response?.data?.user || null;
      setUser(resolvedUser);
      return resolvedUser;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    const loadCurrentUser = async () => {
      await hydrateUser();
      setLoading(false);
    };

    loadCurrentUser();
  }, [hydrateUser]);

  const login = useCallback(async (credentials) => {
    const response = await loginAPI(credentials);
    await hydrateUser();
    return response;
  }, [hydrateUser]);

  const register = useCallback(async (payload) => {
    const response = await registerAPI(payload);
    await hydrateUser();
    return response;
  }, [hydrateUser]);

  const logout = useCallback(async () => {
    try {
      await logoutAPI();
    } catch {}
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
    }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};