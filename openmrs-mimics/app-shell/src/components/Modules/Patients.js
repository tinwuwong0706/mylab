import React from 'react';

const Patients = () => {
  return (
    <>
      <div className="module-header">
        <h2>Patient Management</h2>
        <p>Manage patient records and information</p>
      </div>
      <div className="form-row">
        <input 
          type="text" 
          placeholder="Search patients..." 
          style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }} 
        />
      </div>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Last Visit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>P-1001</td>
            <td>John Doe</td>
            <td>42</td>
            <td>Male</td>
            <td>15 Oct 2023</td>
            <td>
              <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>View</button>
            </td>
          </tr>
          <tr>
            <td>P-1002</td>
            <td>Jane Smith</td>
            <td>35</td>
            <td>Female</td>
            <td>12 Oct 2023</td>
            <td>
              <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>View</button>
            </td>
          </tr>
          <tr>
            <td>P-1003</td>
            <td>Robert Johnson</td>
            <td>58</td>
            <td>Male</td>
            <td>10 Oct 2023</td>
            <td>
              <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Patients;