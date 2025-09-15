import React from 'react';

const System = () => {
  return (
    <>
      <div className="module-header">
        <h2>System Administration</h2>
        <p>Manage system settings and users</p>
      </div>
      
      <div className="form-section">
        <h3 className="form-title">User Management</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>admin</td>
              <td>System Administrator</td>
              <td className="text-success">Active</td>
              <td>
                <button className="btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Edit</button>
              </td>
            </tr>
            <tr>
              <td>doctor1</td>
              <td>Clinician</td>
              <td className="text-success">Active</td>
              <td>
                <button className="btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Edit</button>
              </td>
            </tr>
            <tr>
              <td>nurse1</td>
              <td>Nurse</td>
              <td className="text-warning">Inactive</td>
              <td>
                <button className="btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="form-section">
        <h3 className="form-title">System Settings</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="system-name">System Name</label>
            <input type="text" id="system-name" defaultValue="OpenMRS-like EMR" />
          </div>
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select 
              id="language" 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Arabic</option>
            </select>
          </div>
        </div>
        <button className="btn">Save Settings</button>
      </div>
    </>
  );
};

export default System;