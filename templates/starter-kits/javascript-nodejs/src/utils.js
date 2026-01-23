/**
 * Utility functions for the application
 */

/**
 * Generate a greeting message
 * @param {string} name - The name to greet
 * @returns {string} The greeting message
 */
function greet(name) {
  if (!name || typeof name !== 'string') {
    throw new Error('Name must be a non-empty string');
  }
  return `Hello, ${name}!`;
}

/**
 * Add two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} The sum of a and b
 */
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a + b;
}

module.exports = {
  greet,
  add
};
