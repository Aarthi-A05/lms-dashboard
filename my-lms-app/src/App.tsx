import './App.css';
import RoleSelector from './pages/RoleSelector';
import { RoleProvider, useRole } from './contexts/RoleContext';
import Dashboard from './pages/Dashboard';

const AppContent = () => {
  const { currentUser } = useRole();

  // This checks RBAC before rendering the dashboard
  if (!currentUser) {
    return <RoleSelector />;
  }

  return <Dashboard />;
};

export default function Root() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  );
}