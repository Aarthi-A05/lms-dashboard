import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './App.tsx'; // Changed from App to Root since you export Root
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Root />
    </ErrorBoundary>
  </React.StrictMode>
);
