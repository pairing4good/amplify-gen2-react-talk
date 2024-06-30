import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

vi.mock('aws-amplify/data', () => ({
    generateClient: () => { return {
        models: {
            Todo: {
                observeQuery: () => {
                    return {subscribe: vi.fn()}
                }
            }
        }
    }}
  }))

describe('App', () => {
  it('renders the App component', () => {
    render(<App />)
    
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
    expect(true).toBe(false);
  })
})