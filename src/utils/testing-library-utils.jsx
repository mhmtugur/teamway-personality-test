import { render } from '@testing-library/react'
import { QuestionProvider } from '../context/question-context'

const renderWithContext = (ui, options) => render(ui, { wrapper: QuestionProvider, ...options })

export * from '@testing-library/react'

export { renderWithContext as render }
