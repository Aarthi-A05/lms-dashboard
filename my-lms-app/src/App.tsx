import './App.css';
import RoleSelector from './pages/RoleSelector';
import AdminUsageWidget from './components/AdminUsageWidget'; // Reintroduce for testing

// App component to handle rendering based on current user
function App({ currentUser }: { currentUser: any }) { // Pass currentUser as a prop
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
          <AdminUsageWidget />
        </div>
      ) : (
        <RoleSelector />
      )}
    </div>
  );
}

export default App;