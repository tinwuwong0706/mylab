// src/hooks/useColorApi.js
import { useState, useEffect } from 'react';
import { colorApi } from '../util/Api';

export const useColorApi = () => {
  const [color, setColor] = useState(colorApi.getCurrentColor());

  useEffect(() => {
    // Subscribe to color changes
    const unsubscribe = colorApi.subscribe(newColor => {
      setColor(newColor);
    });

    return unsubscribe;
  }, []);

  return {
    color,
    setColor: colorApi.setColor.bind(colorApi),
    cycleColor: colorApi.cycleColor.bind(colorApi),
    setRandomColor: colorApi.setRandomColor.bind(colorApi),
    getAvailableColors: colorApi.getAvailableColors.bind(colorApi),
    isValidColor: colorApi.isValidColor.bind(colorApi)
  };
};