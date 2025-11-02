import React, { useState, useContext, createContext } from "react";

export const SearchContexts = createContext();

const SearchContext = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContexts.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContexts.Provider>
  );
};

export default SearchContext;