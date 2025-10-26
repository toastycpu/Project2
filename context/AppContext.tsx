import React, { createContext, useContext, useState, ReactNode } from "react";
import { Appearance } from "react-native";

type ThemeType = "light" | "dark" | "system";
type UserRole = "user" | "admin";

interface User {
  username: string;
  role: UserRole;
}

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  toggleRole: () => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ username: "Guest", role: "user" });
  const [theme, setTheme] = useState<ThemeType>(
    Appearance.getColorScheme() || "light"
  );

  const toggleRole = () => {
    setUser((prev) => ({
      ...prev,
      role: prev.role === "admin" ? "user" : "admin",
    }));
  };

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light"
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        toggleRole,
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
