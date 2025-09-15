import React from 'react';

const PatientCard = () => {
  return (
    <div className="patient-card">
      <div className="patient-header">
        <div className="patient-avatar">JD</div>
        <div className="patient-info">
          <h3>John Doe</h3>
          <p>Patient ID: P-1001</p>
        </div>
      </div>
      <div className="patient-details">
        <div className="detail-item">
          <div className="detail-label">Age</div>
          <div>42 years</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Gender</div>
          <div>Male</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Last Visit</div>
          <div>15 Oct 2023</div>
        </div>
        <div className="detail-item">
          <div className="detail-label">Status</div>
          <div className="text-success">Active</div>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;