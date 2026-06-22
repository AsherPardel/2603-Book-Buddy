import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  //state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  function login(userData, userToken) {
    setUser(userData);
    setToken(userToken);
  }

  function logout() {
    setUser(null);

    setToken(null);
  }
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
