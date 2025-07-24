import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const darkPref = localStorage.getItem('darkMode');
    const token = localStorage.getItem('auth_token');
    if (darkPref === 'true') setIsDarkMode(true);
    if (token) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem('darkMode', 'true');
      document.body.classList.add('dark-mode', 'bg-gray-900', 'text-white');
    } else {
      localStorage.setItem('darkMode', 'false');
      document.body.classList.remove('dark-mode', 'bg-gray-900', 'text-white');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen p-4">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Toggle Dark Mode
      </button>

      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
