import React from 'react';

const Clinical = () => {
  return (
    <>
      <div className="module-header">
        <h2>Clinical Module</h2>
        <p>Clinical functions and patient care</p>
      </div>
      
      <div className="form-section">
        <h3 className="form-title">Vital Signs</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="blood-pressure">Blood Pressure</label>
            <input type="text" id="blood-pressure" placeholder="120/80" />
          </div>
          <div className="form-group">
            <label htmlFor="heart-rate">Heart Rate</label>
            <input type="number" id="heart-rate" placeholder="72" />
          </div>
          <div className="form-group">
            <label htmlFor="temperature">Temperature</label>
            <input type="number" id="temperature" placeholder="98.6" />
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3 className="form-title">Clinical Notes</h3>
        <div className="form-group">
          <textarea 
            style={{ width: '100%', height: '150px', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }} 
            placeholder="Enter clinical notes..."
          ></textarea>
        </div>
      </div>
      
      <button className="btn">Save Clinical Data</button>
    </>
  );
};

export default Clinical;