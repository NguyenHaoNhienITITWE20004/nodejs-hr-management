// src/components/LoginRegister.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Tabs, Tab } from '@mui/material';
import { registerUser, loginUser } from '../services/authService'; // Import authService

const LoginRegister = () => {
  const [mode, setMode] = useState('login'); // 'login' hoặc 'register'
  const [credentials, setCredentials] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset lỗi trước khi thực hiện gọi API

    if (mode === 'login') {
      try {
        const response = await loginUser(credentials.email, credentials.password);
        console.log('Login successful!', response);
        // Giả lập đăng nhập thành công, lưu token nếu cần
        navigate('/employees'); // Điều hướng đến trang bảng điều khiển nhân viên
      } catch (err) {
        console.error('Login failed:', err);
        setError(err.message || 'Invalid credentials!');
      }
    } else {
      if (credentials.password === credentials.confirmPassword) {
        try {
          const response = await registerUser(credentials.email, credentials.password);
          console.log('Registration successful!', response);
          alert('User registered successfully!');
        } catch (err) {
          console.error('Registration failed:', err);
          setError(err.message || 'Registration failed!');
        }
      } else {
        setError('Passwords do not match!');
      }
    }
  };

  return (
    <Paper style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <Tabs
        value={mode}
        onChange={(e, newValue) => setMode(newValue)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Login" value="login" />
        <Tab label="Register" value="register" />
      </Tabs>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        {mode === 'register' && (
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={credentials.confirmPassword}
            onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
          />
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {mode === 'login' ? 'Login' : 'Register'}
        </Button>
      </form>
    </Paper>
  );
};

export default LoginRegister;
