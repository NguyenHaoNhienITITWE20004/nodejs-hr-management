// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeManagement from './components/EmployeeManagement';
import LoginRegister from './components/LoginRegister';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/employees" element={<EmployeeManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
