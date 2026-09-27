import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        setLoading
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
