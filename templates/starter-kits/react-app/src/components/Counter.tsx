import { useState } from 'react'
import './Counter.css'

/**
 * Props for the Counter component
 */
interface CounterProps {
  initialCount?: number
}

/**
 * Counter Component
 * 
 * A simple counter with increment, decrement, and reset functionality.
 * Demonstrates state management and event handling.
 * 
 * @param initialCount - Starting count value (default: 0)
 */
const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(initialCount)

  return (
    <div className="counter">
      <div className="counter-display">
        <span className="counter-value">{count}</span>
      </div>
      <div className="counter-controls">
        <button onClick={decrement} className="button button-secondary">
          - Decrement
        </button>
        <button onClick={reset} className="button button-tertiary">
          Reset
        </button>
        <button onClick={increment} className="button button-primary">
          + Increment
        </button>
      </div>
    </div>
  )
}

export default Counter
