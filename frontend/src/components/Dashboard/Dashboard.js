import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username'); // Retrieve the username

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://loanmanager1.onrender.com/api/applications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications', error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className='dashboard-container'>
      <div className='dashboard-header'>
        <h2>{role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</h2>
        <div className='profile-section'>
          <span>{username || 'Guest'}</span>
          <CgProfile className='profile-icon' />
        </div>
      </div>
      {role === 'user' && (
        <div>
          <Link to="/apply">
            <button>Apply for a Loan</button>
          </Link>
        </div>
      )}
      <h3>Your Loan Applications</h3>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Amount</th>
            <th>Tenure</th>
            <th>Status</th>
            {role === 'admin' && <th>Username</th>}
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td>{app.fullName}</td>
              <td>${app.amount}</td>
              <td>{app.tenure} months</td>
              <td className={app.status === 'approved' ? 'status-green' : 'status-red'}>
                {app.status}
              </td>
              {role === 'admin' && <td>{app.userId?.username || 'N/A'}</td>}
              <td>{new Date(app.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;