import React from 'react';

const ChildInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter text"
    />
  );
};

export default ChildInput;