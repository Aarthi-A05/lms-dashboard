import './App.css';
import RoleSelector from './pages/RoleSelector';
import { RoleProvider, useRole } from './contexts/RoleContext';
import Dashboard from './pages/Dashboard';

function App({ currentUser }: { currentUser: any }) {
  return (
    <div className="App">
      {currentUser ? <Dashboard /> : <RoleSelector />}
    </div>
  );
}

const AppWithProvider = () => {
  const { currentUser } = useRole();
  return <App currentUser={currentUser} />;
};

export default function Root() {
  return (
    <RoleProvider>
      <AppWithProvider />
    </RoleProvider>
  );
}