import { useState } from 'react'
import Counter from './components/Counter'
import Greeting from './components/Greeting'
import './App.css'

/**
 * Main App Component
 * 
 * Demonstrates component composition and state management
 * with governance-compliant architecture.
 */
function App() {
  const [name, setName] = useState<string>('World')

  return (
    <div className="app">
      <header className="app-header">
        <h1>React App with Governance</h1>
        <p>A modern React application with built-in governance framework</p>
      </header>

      <main className="app-main">
        <section className="section">
          <h2>Greeting Component</h2>
          <Greeting name={name} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="input"
            aria-label="Name input"
          />
        </section>

        <section className="section">
          <h2>Counter Component</h2>
          <Counter initialCount={0} />
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React 18 + TypeScript + Vite</p>
      </footer>
    </div>
  )
}

export default App
