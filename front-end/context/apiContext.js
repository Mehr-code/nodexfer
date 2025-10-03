"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ApiContext = createContext(null);

export function ApiProvider({ children }) {
  const [apiBase, setApiBase] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get(`/api/config`);
        setApiBase(`http://${res.data.host}:${res.data.port}`);
      } catch (err) {
        console.error("خطا در گرفتن API Base: ", err);
        setError(true);
      }
    };
    fetchConfig();
  }, []);

  return (
    <ApiContext.Provider value={{ apiBase, error }}>
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);
