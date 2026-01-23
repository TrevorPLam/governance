/**
 * Main application entry point
 * 
 * This is a simple Node.js application that demonstrates
 * basic project structure with governance compliance.
 */

const { greet, add } = require('./utils');

/**
 * Main application function
 */
function main() {
  console.log(greet('World'));
  
  const result = add(5, 3);
  console.log(`5 + 3 = ${result}`);
  
  console.log('Application running successfully!');
}

// Run the application if this is the main module
if (require.main === module) {
  main();
}

module.exports = { main };
