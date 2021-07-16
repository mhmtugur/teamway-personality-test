import { screen, render } from '@testing-library/react'
import ProgressBar from './progress-bar'

test('progress bar should be render', () => {
   render(<ProgressBar progressRatio={40} />)

   const progressRatioText = screen.getByText('40%')
   expect(progressRatioText).toBeInTheDocument()
})
