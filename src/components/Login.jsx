import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGIN = import.meta.env.VITE_API_LOGIN;
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${LOGIN}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.authenticated) {
      localStorage.setItem('token', data.Authorization);
      navigate('/app');
    } else {
      setError('Login failed. Please check your username and password.')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="error">{error}</div>}
      <label>
        Username
        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
      </label>
      <label>
        Password
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
      </label>
      <button type="submit">Login</button>
      <button type="button" onClick={() => navigate('/')}>Return to Main Page</button>
    </form>
  );
}

export default Login;