import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the context value
interface RoleContextType {
  currentUser: any; // Will refine to User type later
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
}

// Create the context with a default value
export const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Provider component to wrap the app
export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Load persisted role from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem('currentRole');
    if (storedRole) {
      setCurrentUser(JSON.parse(storedRole));
    }
  }, []);

  return (
    <RoleContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </RoleContext.Provider>
  );
};

// Custom hook to use the context
export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};