import React, { useState, useEffect} from 'react';
import ChildInput from './ChildInput';
const Parent = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    console.log('Child input value:', newValue);
  };

  return (
    <div>
      <ChildInput value={inputValue} onChange={handleInputChange} />
      <p>Current value: {inputValue}</p>
    </div>
  );
};

export default Parent;