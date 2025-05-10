import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting login with:', { username, password });
      const response = await axios.post('https://loanmanager1.onrender.com/api/auth/login', { username, password });
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('username', response.data.username); // Store the username
      if (response.data.role === 'verifier') {
        console.log('Navigating to /verifier');
        navigate('/verifier');
      } else if (response.data.role === 'user' || response.data.role === 'admin') {
        console.log('Navigating to /dashboard');
        navigate('/dashboard');
      } else {
        console.log('Unknown role:', response.data.role);
        setError('Unknown role');
      }
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError('Invalid username or password');
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <p>Test Credentials:</p>
      <p>User: user1 / password123</p>
      <p>Admin: admin1 / admin123</p>
      <p>Verifier: verifier1 / verifier123</p>
    </div>
  );
};

export default Login;