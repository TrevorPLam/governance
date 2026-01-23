import { useState, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function App() {
  const [message, setMessage] = useState<string>('')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchMessage()
    fetchItems()
  }, [])

  const fetchMessage = async () => {
    try {
      const res = await fetch(`${API_URL}/api`)
      const data = await res.json()
      setMessage(data.message)
    } catch (error) {
      console.error('Error fetching message:', error)
    }
  }

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/items`)
      const data = await res.json()
      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>Full-Stack App with Governance</h1>
      <div className="content">
        <section>
          <h2>API Connection</h2>
          <p>{message || 'Loading...'}</p>
        </section>
        <section>
          <h2>Items from Backend</h2>
          {loading ? (
            <p>Loading items...</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
