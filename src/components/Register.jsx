import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGIN = import.meta.env.VITE_API_LOGIN;
function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const res = await fetch(`${LOGIN}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.Authorization) {
        localStorage.setItem('token', data.Authorization);
        navigate('/app');
      } else {
        setError('Registration failed. Please try again.')
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="register-form">
        {error && <div className="error">{error}</div>}
        <label>
          Username
          <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
        </label>
        <label>
          Password
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        </label>
        <button type="submit">Register</button>
        <button type="button" onClick={() => navigate('/')}>Return to Main Page</button>
      </form>
    );
  }

export default Register;