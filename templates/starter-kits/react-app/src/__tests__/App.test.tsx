import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('React App with Governance')).toBeInTheDocument()
  })

  it('renders greeting component', () => {
    render(<App />)
    expect(screen.getByText(/Hello/)).toBeInTheDocument()
  })

  it('renders counter component', () => {
    render(<App />)
    expect(screen.getByText(/Counter Component/)).toBeInTheDocument()
  })

  it('updates greeting when name is changed', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByLabelText('Name input')
    await user.clear(input)
    await user.type(input, 'Alice')
    
    expect(screen.getByText(/Hello, Alice!/)).toBeInTheDocument()
  })

  it('counter increments when increment button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const incrementButton = screen.getByText(/\+ Increment/)
    await user.click(incrementButton)
    
    // Counter should show 1 after clicking increment
    const counterDisplay = screen.getByText('1')
    expect(counterDisplay).toBeInTheDocument()
  })

  it('counter decrements when decrement button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const decrementButton = screen.getByText(/- Decrement/)
    await user.click(decrementButton)
    
    // Counter should show -1 after clicking decrement
    const counterDisplay = screen.getByText('-1')
    expect(counterDisplay).toBeInTheDocument()
  })

  it('counter resets when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const incrementButton = screen.getByText(/\+ Increment/)
    const resetButton = screen.getByText(/Reset/)
    
    // Increment a few times
    await user.click(incrementButton)
    await user.click(incrementButton)
    
    // Reset
    await user.click(resetButton)
    
    // Counter should show 0
    const counterDisplay = screen.getByText('0')
    expect(counterDisplay).toBeInTheDocument()
  })
})
