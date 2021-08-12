import { screen, render } from '@testing-library/react'
import App from './App'

test('App should be render', () => {
   render(<App />)
   const title = screen.getByText('Check Your Personality')
   expect(title).toBeInTheDocument()
})
