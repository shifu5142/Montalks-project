"use client";
import { createContext, ReactNode, useState, useContext } from "react";
type User = {
  fullName: string;
  email: string;
};

type AppContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}

export { AppProvider, useAppContext };
