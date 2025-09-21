import React, { useState, useEffect } from 'react';
import { useColorApi } from '../hooks/useColorApi';

const ColorLabel = ({ text = 'Sample Text', fontSize  = '25px' }) => {
  const { color } = useColorApi();

  return (
    <div>
      <span 
        style={{ 
          color: color, 
          fontSize: fontSize,
          fontWeight: 'bold',
          padding: '10px',
          border: `2px solid ${color}`,
          borderRadius: '5px'
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default ColorLabel;