"use client";
import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

const USER_KEY = "montalks_user";

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
  const [user, setUserState] = useState<User | null>(null);

  const setUser = useCallback((u: User | null) => {
    setUserState(u);
    if (typeof window === "undefined") return;
    if (u === null) localStorage.removeItem(USER_KEY);
    else localStorage.setItem(USER_KEY, JSON.stringify(u));
  }, []);

  // Restore user from localStorage on load (e.g. after refresh)
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(USER_KEY) : null;
    if (stored) {
      try {
        setUserState(JSON.parse(stored));
      } catch {
        setUserState(null);
      }
    }
  }, []);

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
