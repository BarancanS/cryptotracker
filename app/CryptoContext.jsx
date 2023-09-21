"use client";
import { createContext, useState, useEffect, useContext } from "react";
import React from "react";
const Crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  useEffect(() => {
    if (currency === "USD") {
      setSymbol("$");
    } else {
      setSymbol("₺");
    }
  }, [currency, symbol]);
  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, setSymbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;
export const CryptoState = () => {
  return useContext(Crypto);
};
