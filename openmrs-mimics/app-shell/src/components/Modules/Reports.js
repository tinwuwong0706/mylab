import React from 'react';

const Reports = () => {
  return (
    <>
      <div className="module-header">
        <h2>Reports & Analytics</h2>
        <p>View and generate reports</p>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="report-type">Report Type</label>
          <select 
            id="report-type" 
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option>Patient Census</option>
            <option>Clinical Outcomes</option>
            <option>Appointment Statistics</option>
            <option>Pharmacy Orders</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date-range">Date Range</label>
          <select 
            id="date-range" 
            style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>
      
      <button className="btn">Generate Report</button>
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9f9f9', borderRadius: '4px' }}>
        <h4>Report Preview</h4>
        <p>Select report type and date range to generate a report.</p>
      </div>
    </>
  );
};

export default Reports;