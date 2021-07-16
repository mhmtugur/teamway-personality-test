import { screen, render } from '@testing-library/react'
import colors from '../../theme/colors'
import Title from './title'

test('title should be render', () => {
   render(<Title>test title</Title>)
   const title = screen.getByText(/test title/i)
   expect(title).toBeInTheDocument()
   expect(title).toHaveStyle({ color: colors.pink, fontSize: 56 })
})
