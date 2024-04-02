import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdError } from 'react-icons/md';
import logo from '../assets/FinApp.png';
import config from '../config';

const { VITE_API_LOGIN } = config;

const LOGIN = VITE_API_LOGIN;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      navigate('/');
    } else {
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-40 w-40" /> 
          <h1 className="text-3xl font-bold text-white mb-6">AI Finance Cloud</h1> 
          <h2 className="text-center text-2xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-200">
            Or{' '}
            <Link to="/register" className="font-medium text-indigo-500 hover:text-indigo-400">
              create your account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <MdError className="h-5 w-5 text-white" aria-hidden="true" />                
                </div>
                <div className="ml-3">
                  <p className="text-sm text-white">{error}</p>
                </div>
              </div>
            </div>
          )}
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-white placeholder-gray-600 text-gray-900 rounded-t-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 bg-white placeholder-gray-600 text-gray-900 rounded-b-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;