import React, { useState } from 'react';
import axios from 'axios';
import './ApplicationForm.css';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    amount: '',
    tenure: '',
    employmentStatus: '',
    reason: '',
    employmentAddress: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://loanmanager1.onrender.com/api/submit-application', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error submitting application');
    }
  };

  const role = localStorage.getItem('role');
  if (role !== 'user') return null; // Only render for users

  return (
    <div className='form-container'>
      <h2>Apply for a Loan</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name: </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount Needed: </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Loan Tenure (months): </label>
          <input
            type="number"
            name="tenure"
            value={formData.tenure}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Employment Status: </label>
          <input
            type="text"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reason for Loan: </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Employment Address: </label>
          <textarea
            name="employmentAddress"
            value={formData.employmentAddress}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplicationForm;