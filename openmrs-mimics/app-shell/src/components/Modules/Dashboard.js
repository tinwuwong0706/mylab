import React from 'react';
import PatientCard from '../Common/PatientCard';

const Dashboard = () => {
  return (
    <>
      <div className="module-header">
        <h2>Dashboard</h2>
        <p>Welcome to your OpenMRS-like EMR system</p>
      </div>
      <div id="module-content">
        <PatientCard />
        
        <h3>Recent Visits</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Provider</th>
              <th>Diagnosis</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>15 Oct 2023</td>
              <td>Dr. Smith</td>
              <td>Hypertension</td>
              <td className="text-success">Completed</td>
            </tr>
            <tr>
              <td>10 Sep 2023</td>
              <td>Dr. Johnson</td>
              <td>Diabetes follow-up</td>
              <td className="text-success">Completed</td>
            </tr>
            <tr>
              <td>05 Aug 2023</td>
              <td>Dr. Williams</td>
              <td>General checkup</td>
              <td className="text-success">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;