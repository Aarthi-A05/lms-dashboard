import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>LMS Dashboard Assignment</h1>
      <p>Welcome to the role-based LMS dashboard. Select a role to begin.</p>
      <button onClick={() => setCount((count) => count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;