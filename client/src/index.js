import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { UserContext } from '../src/hooks/UserContext';

function Index() {
  const [user, setUser] = useState({
    token: localStorage.getItem('token') || '',
    userType: localStorage.getItem('userType') || ''
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <App />
    </UserContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(<Index />);

