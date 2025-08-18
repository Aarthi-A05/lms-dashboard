import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  role: string;
  name: string;
  permissions: string[];
}

interface RoleContextType {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('currentRole');
    if (storedRole) {
      setCurrentUser(JSON.parse(storedRole));
      console.log('Initial load or update, currentUser:', JSON.parse(storedRole));
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentRole') {
        const newRole = e.newValue ? JSON.parse(e.newValue) : null;
        console.log('Storage change detected, new role:', newRole);
        setCurrentUser(newRole);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <RoleContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context as RoleContextType;
};