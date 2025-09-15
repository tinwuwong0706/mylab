import React, { createContext, useState, useEffect } from 'react';

export const CustomizationContext = createContext();

export const CustomizationProvider = ({ children }) => {
  const [customization, setCustomization] = useState({
    primaryColor: '#0078a8',
    secondaryColor: '#5b57a6',
    backgroundColor: '#f9f9f9',
    welcomeText: 'Welcome to OpenMRS-like EMR'
  });

  useEffect(() => {
    // Load saved customization from localStorage
    const saved = localStorage.getItem('loginCustomization');
    if (saved) {
      const savedCustomization = JSON.parse(saved);
      setCustomization(savedCustomization);
      applyCustomization(savedCustomization);
    }
  }, []);

  const applyCustomization = (customizationData) => {
    document.documentElement.style.setProperty('--primary-color', customizationData.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', customizationData.secondaryColor);
    document.documentElement.style.setProperty('--background-color', customizationData.backgroundColor);
  };

  const updateCustomization = (newCustomization) => {
    setCustomization(newCustomization);
    applyCustomization(newCustomization);
    localStorage.setItem('loginCustomization', JSON.stringify(newCustomization));
  };

  const resetCustomization = () => {
    const defaultCustomization = {
      primaryColor: '#0078a8',
      secondaryColor: '#5b57a6',
      backgroundColor: '#f9f9f9',
      welcomeText: 'Welcome to OpenMRS-like EMR'
    };
    setCustomization(defaultCustomization);
    applyCustomization(defaultCustomization);
    localStorage.removeItem('loginCustomization');
  };

  return (
    <CustomizationContext.Provider value={{
      customization,
      updateCustomization,
      resetCustomization
    }}>
      {children}
    </CustomizationContext.Provider>
  );
};