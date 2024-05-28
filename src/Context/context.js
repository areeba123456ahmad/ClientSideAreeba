import { useState, createContext } from "react";

const Context = createContext();
const ContextProvider = ({ children }) => {
  const [isOpen, toggleOpen] = useState(false);

  return (
    <Context.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </Context.Provider>
  );
};

export { ContextProvider, Context };
