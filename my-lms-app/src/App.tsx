import './App.css';
import RoleSelector from './pages/RoleSelector';
import { RoleProvider, useRole } from './contexts/RoleContext';
import Dashboard from './pages/Dashboard';

const AppContent = () => {
  const { currentUser } = useRole();

  // This checks RBAC before rendering the dashboard
  return currentUser ? <Dashboard /> : <RoleSelector />;
};

export default function Root() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
}