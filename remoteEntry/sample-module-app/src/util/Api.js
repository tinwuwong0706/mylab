// src/Api.js - Pure JavaScript API (no React hooks)
class ColorApi {
  constructor() {
    this.colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    this.subscribers = new Set();
    this.currentColor = 'black';
  }

  // Get all available colors
  getAvailableColors() {
    return this.colors;
  }

  // Set current color and notify subscribers
  setColor(color) {
    if (this.isValidColor(color)) {
      this.currentColor = color;
      this.notifySubscribers();
      return true;
    }
    return false;
  }

  // Get current color
  getCurrentColor() {
    return this.currentColor;
  }

  // Get next color in cycle
  getNextColor() {
    const currentIndex = this.colors.indexOf(this.currentColor);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % this.colors.length;
    return this.colors[nextIndex];
  }

  // Cycle to next color
  cycleColor() {
    const nextColor = this.getNextColor();
    this.setColor(nextColor);
    return nextColor;
  }

  // Validate if color is available
  isValidColor(color) {
    return this.colors.includes(color);
  }

  // Get random color
  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  // Set random color
  setRandomColor() {
    const randomColor = this.getRandomColor();
    this.setColor(randomColor);
    return randomColor;
  }

  // Subscribe to color changes
  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  // Notify all subscribers
  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.currentColor));
  }
}

// Create singleton instance
const colorApi = new ColorApi();

// Utility functions
export const apiUtils = {
  formatColorName: (color) => color.charAt(0).toUpperCase() + color.slice(1),
  getColorHex: (color) => {
    const colorMap = {
      red: '#FF0000', blue: '#0000FF', green: '#00FF00',
      yellow: '#FFFF00', purple: '#800080', orange: '#FFA500'
    };
    return colorMap[color] || '#000000';
  }
};

// Export the API instance and utilities
export default colorApi;
export { colorApi};