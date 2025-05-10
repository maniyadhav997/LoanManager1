import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import VerifierDashboard from './components/VerifierDashboard/VerifierDashboard';
import ApplicationForm from './components/ApplicationForm/ApplicationForm'; // Import ApplicationForm
import './App.css';

const App = () => {
  return (
    <Router>
      <div class="main-container">
        <h1>Loan Manager (Community)</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verifier" element={<VerifierDashboard />} />
          <Route path="/apply" element={<ApplicationForm />} /> {/* New route for the form */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;