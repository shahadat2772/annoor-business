import React, { createContext } from "react";

export const AuthContext = createContext();

const AnnnoorAuthContext = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default AnnnoorAuthContext;
