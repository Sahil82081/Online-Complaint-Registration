import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  return (
    <StateContext.Provider
      value={{
        token,
        setToken,
        setLoading
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// ✅ Custom Hook
export const useStateContext = () => useContext(StateContext);
