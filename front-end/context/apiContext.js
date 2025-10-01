"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ApiContext = createContext("");

export function ApiProvider({ children }) {
  const [apiBase, setApiBase] = useState("");

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get("/api/config");
        setApiBase(`http://${res.data.host}:${res.data.port}`);
      } catch (err) {
        console.error("خطا در گرفتن API Base: ", err);
      }
    };
    fetchConfig();
  }, []);

  return <ApiContext.Provider value={apiBase}>{children}</ApiContext.Provider>;
}

export const useApi = () => useContext(ApiContext);
