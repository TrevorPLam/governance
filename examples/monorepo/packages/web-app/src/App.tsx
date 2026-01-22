import React from 'react';
import { Button } from '@governance-example/ui';
import { isValidEmail } from '@governance-example/utils';

/**
 * Main App component
 * 
 * Layer: Application
 * Boundaries: Can import from @governance-example/ui and @governance-example/utils
 * Cannot import: @governance-example/api (backend)
 */
function App() {
  const [email, setEmail] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(isValidEmail(value));
  };

  const handleSubmit = () => {
    if (isValid) {
      console.log('Submitting email:', email);
      // Call API here
    }
  };

  return (
    <div className="App">
      <h1>Governance Example - Web App</h1>
      <div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />
        <p>Email is {isValid ? 'valid' : 'invalid'}</p>
        <Button
          label="Submit"
          onClick={handleSubmit}
          disabled={!isValid}
          variant="primary"
        />
      </div>
    </div>
  );
}

export default App;
