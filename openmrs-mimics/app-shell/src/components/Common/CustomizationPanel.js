import React, { useState, useContext } from 'react';
import { CustomizationContext } from '../../utils/customization';

const CustomizationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { customization, updateCustomization, resetCustomization } = useContext(CustomizationContext);
  const [formData, setFormData] = useState(customization);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleApply = () => {
    updateCustomization(formData);
  };

  const handleReset = () => {
    setFormData({
      primaryColor: '#0078a8',
      secondaryColor: '#5b57a6',
      backgroundColor: '#f9f9f9',
      welcomeText: 'Welcome to OpenMRS-like EMR'
    });
    resetCustomization();
  };

  return (
    <>
      <button 
        className="toggle-customization" 
        id="toggle-customization"
        onClick={() => setIsOpen(!isOpen)}
      >
        Customize
      </button>
      
      <div className={`customization-panel ${isOpen ? 'open' : ''}`} id="customization-panel">
        <h3>Login Page Customization</h3>
        <div className="form-group">
          <label htmlFor="primary-color">Primary Color</label>
          <input 
            type="color" 
            id="primaryColor" 
            value={formData.primaryColor} 
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="secondary-color">Secondary Color</label>
          <input 
            type="color" 
            id="secondaryColor" 
            value={formData.secondaryColor} 
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="background-color">Background Color</label>
          <input 
            type="color" 
            id="backgroundColor" 
            value={formData.backgroundColor} 
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="welcome-text">Welcome Text</label>
          <input 
            type="text" 
            id="welcomeText" 
            value={formData.welcomeText} 
            onChange={handleInputChange}
          />
        </div>
        <button className="btn" onClick={handleApply}>Apply Changes</button>
        <button 
          className="btn" 
          onClick={handleReset}
          style={{ marginTop: '10px', backgroundColor: '#666' }}
        >
          Reset to Default
        </button>
      </div>
    </>
  );
};

export default CustomizationPanel;