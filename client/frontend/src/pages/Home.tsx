import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome, {user}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
