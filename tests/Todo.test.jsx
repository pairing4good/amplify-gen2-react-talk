import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Todo from '../src/Todo'

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

describe('Todo', () => {
  it('renders the App component', () => {
    render(<Todo/>)
    
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})