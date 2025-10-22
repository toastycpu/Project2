import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'user';

interface User {
  name: string;
  role: UserRole;
}

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  toggleRole: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    name: 'Guest',
    role: 'user',
  });

  const toggleRole = () => {
    setUser(prev => ({
      ...prev,
      role: prev.role === 'admin' ? 'user' : 'admin',
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, toggleRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
