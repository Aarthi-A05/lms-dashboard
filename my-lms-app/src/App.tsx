import './App.css';
import RoleSelector from './pages/RoleSelector';
import { RoleProvider, useRole } from './contexts/RoleContext';
import AdminUsageWidget from './components/AdminUsageWidget';
import StudentProgressWidget from './components/StudentProgressWidget';

// App component to handle rendering based on current user
function App({ currentUser }: { currentUser: any }) {
  return (
    <div className="App">
      {currentUser ? (
        <div>
          <h2>Welcome, {currentUser.name} ({currentUser.role})!</h2>
          <button
            onClick={() => {
              localStorage.removeItem('currentRole');
              window.location.reload(); // Temporary reload
            }}
          >
            Logout
          </button>
          {currentUser.role === 'Admin' && <AdminUsageWidget />}
          {currentUser.role === 'Student' && <StudentProgressWidget />}
        </div>
      ) : (
        <RoleSelector />
      )}
    </div>
  );
}

export default App;