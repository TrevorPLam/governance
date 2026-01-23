/**
 * Example test suite
 * 
 * Demonstrates testing practices with Jest
 */

const { greet, add } = require('../src/utils');
const { main } = require('../src/index');

describe('greet', () => {
  it('should return a greeting message', () => {
    expect(greet('Alice')).toBe('Hello, Alice!');
  });

  it('should throw error for invalid input', () => {
    expect(() => greet('')).toThrow('Name must be a non-empty string');
    expect(() => greet(null)).toThrow('Name must be a non-empty string');
    expect(() => greet(123)).toThrow('Name must be a non-empty string');
  });
});

describe('add', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  it('should throw error for non-number inputs', () => {
    expect(() => add('1', 2)).toThrow('Both arguments must be numbers');
    expect(() => add(1, '2')).toThrow('Both arguments must be numbers');
  });
});

describe('main', () => {
  it('should run without errors', () => {
    // Suppress console output during test
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    expect(() => main()).not.toThrow();
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});
