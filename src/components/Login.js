import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'doctor123') {  // change this password if needed
      localStorage.setItem('isAdmin', 'true');
      navigate('/');
    } else {
      setError('Invalid password. Try again.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', textAlign: 'center' }}>
      <h2>🔐 Doctor Login</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 10, width: '100%', marginBottom: 10 }}
      />
      <br />
      <button onClick={handleLogin} style={{ padding: '10px 20px' }}>
        Login
      </button>
      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default Login;
