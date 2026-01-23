import React from 'react'

/**
 * Props for the Greeting component
 */
interface GreetingProps {
  name: string
}

/**
 * Greeting Component
 * 
 * Displays a personalized greeting message.
 * 
 * @param name - The name to greet
 */
const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div className="greeting">
      <p>Hello, <strong>{name || 'Guest'}</strong>! 👋</p>
    </div>
  )
}

export default Greeting
