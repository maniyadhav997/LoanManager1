import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CgProfile } from 'react-icons/cg'; // Import CgProfile icon
import './VerifierDashboard.css';

const VerifierDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [username, setUsername] = useState('Guest'); // State for username

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://loanmanager1.onrender.com/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user details:', error.response ? error.response.data : error.message);
      }
    };

    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://loanmanager1.onrender.com/api/applications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error.response ? error.response.data : error.message);
      }
    };

    fetchUserDetails();
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://loanmanager1.onrender.com/api/applications/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Status update response:', response.data);
      // Update the local state to reflect the new status
      setApplications(applications.map(app =>
        app._id === id ? { ...app, status } : app
      ));
    } catch (error) {
      console.error('Error updating status:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='verifier-dashboard'>
      <div className='dashboard-header'>
        <h2>Verifier Dashboard</h2>
        <div className='profile-section'>
          <span>{username}</span>
          <CgProfile className='profile-icon' />
        </div>
      </div>
      <h3>Loan Applications</h3>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Amount</th>
            <th>Tenure</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.fullName}</td>
              <td>${app.amount}</td>
              <td>{app.tenure} months</td>
              <td
                className={
                  app.status === 'approved'
                    ? 'status-green'
                    : app.status === 'rejected'
                    ? 'status-red'
                    : 'status-yellow'
                }
              >
                {app.status}
              </td>
              <td>
                {app.status === 'pending' && (
                  <>
                    <button onClick={() => handleStatusUpdate(app._id, 'approved')}>Approve</button>
                    <button onClick={() => handleStatusUpdate(app._id, 'rejected')}>Reject</button>
                  </>
                )}
              </td>
              <td>{new Date(app.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerifierDashboard;