import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RoleProvider, useRole } from './contexts/RoleContext';
import ErrorBoundary from './components/ErrorBoundary';

const AppWithProvider = () => {
  const { currentUser } = useRole();
  return <App currentUser={currentUser} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RoleProvider>
      <ErrorBoundary>
        <AppWithProvider />
      </ErrorBoundary>
    </RoleProvider>
  </React.StrictMode>,
);