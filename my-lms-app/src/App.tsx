import React, { useState, useEffect } from 'react';
import './App.css';
import RoleSelector from './pages/RoleSelector'; // Import the RoleSelector component
import { RoleContext, RoleProvider } from './contexts/RoleContext'; // Import RoleContext (to be created next)

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null); // Temporary type, will refine with RoleContext

  // Effect to load persisted role from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem('currentRole');
    if (storedRole) {
      setCurrentUser(JSON.parse(storedRole));
    }
  }, []);

  // Handle role selection from RoleSelector
  const handleSelectRole = (user: any) => {
    setCurrentUser(user);
    console.log('Selected role:', user?.role); // Log for debugging
  };

  return (
    <RoleProvider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        {currentUser ? (
          <div>
            <h2>Welcome, {currentUser.name} ({currentUser.role})!</h2>
            <button onClick={() => {
              localStorage.removeItem('currentRole');
              setCurrentUser(null);
            }}>Logout</button>
            {/* Dashboard will go here in Phase 3 */}
          </div>
        ) : (
          <RoleSelector onSelectRole={handleSelectRole} />
        )}
      </div>
    </RoleProvider>
  );
}

export default App;