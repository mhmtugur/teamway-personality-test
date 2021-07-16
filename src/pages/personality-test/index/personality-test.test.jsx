import userEvent from '@testing-library/user-event'
import { screen, render } from '../../../utils/testing-library-utils'
import PersonalityTest from './personality-test'
import QuestionList from '../../../data/questions.json'

let mockQuestionList = [...QuestionList]
jest.mock('../../../service/question', () => ({
   getQuestionList: () => Promise.resolve(mockQuestionList),
}))

describe('initial render', () => {
   test('title', async () => {
      render(<PersonalityTest />)
      const title = await screen.findByText(/Are you an introvert or an extrovert?/i)
      expect(title).toBeInTheDocument()
   })

   test('progress bar', async () => {
      render(<PersonalityTest />)
      const progressBarRatio = await screen.findByText(/0%/i)
      expect(progressBarRatio).toBeInTheDocument()
   })

   test('question index', async () => {
      render(<PersonalityTest />)
      const questionIndex = await screen.findByText(/QUESTION 1 OF 5/i)
      expect(questionIndex).toBeInTheDocument()
   })

   test('question title', async () => {
      render(<PersonalityTest />)
      const questionTitle = await screen.findByText(
         /You’re really busy at work and a colleague is telling you their life story and personal woes. You:/i
      )
      expect(questionTitle).toBeInTheDocument()
   })

   test('question options', async () => {
      render(<PersonalityTest />)

      const questionOptionGroup = await screen.findByRole('radiogroup')
      expect(questionOptionGroup).not.toHaveValue()

      const questionOptions = screen.getAllByRole('radio')
      expect(questionOptions).toHaveLength(4)
   })

   test('question buttons', async () => {
      render(<PersonalityTest />)
      const previousButton = await screen.findByRole('button', { name: 'previous' })
      expect(previousButton).toBeInTheDocument()
      expect(previousButton).toBeDisabled()

      const nextButton = screen.getByRole('button', { name: 'next' })
      expect(nextButton).toBeInTheDocument()
      expect(nextButton).toBeEnabled()

      const submitButton = screen.getByRole('button', { name: 'submit' })
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
   })
})

describe('question actions', () => {
   test('answer question', async () => {
      render(<PersonalityTest />)
      const questionOptionToAnswer = await screen.findByRole('radio', {
         name: 'Listen, but with only with half an ear',
      })
      userEvent.click(questionOptionToAnswer)
      expect(questionOptionToAnswer).toBeChecked()
      const progressBarRatio = screen.getByText(/20%/i)
      expect(progressBarRatio).toBeInTheDocument()
   })

   test('click next', async () => {
      render(<PersonalityTest />)
      const nextButton = await screen.findByRole('button', { name: 'next' })
      userEvent.click(nextButton)

      const questionIndex = screen.getByText(/QUESTION 2 OF 5/i)
      expect(questionIndex).toBeInTheDocument()

      const questionTitle = screen.getByText(
         /You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:/i
      )
      expect(questionTitle).toBeInTheDocument()

      const previousButton = screen.getByRole('button', { name: 'previous' })
      expect(previousButton).toBeEnabled()
   })

   test('click previous', async () => {
      render(<PersonalityTest />)

      const nextButton = await screen.findByRole('button', { name: 'next' })
      userEvent.click(nextButton)

      const previousButton = screen.getByRole('button', { name: 'previous' })
      userEvent.click(previousButton)

      const questionTitle = screen.getByText(
         /You’re really busy at work and a colleague is telling you their life story and personal woes. You:/i
      )
      expect(questionTitle).toBeInTheDocument()

      const questionIndex = screen.getByText(/QUESTION 1 OF 5/i)
      expect(questionIndex).toBeInTheDocument()

      expect(previousButton).toBeDisabled()
   })

   test('click submit', async () => {
      mockQuestionList = mockQuestionList.map((question) => ({ ...question, answer: 'A' }))
      render(<PersonalityTest />)

      const questionOptionToAnswer = await screen.findByRole('radio', {
         name: 'Think it’s more important to give them some of your time; work can wait',
      })
      userEvent.click(questionOptionToAnswer)

      const submitButton = screen.getByRole('button', { name: 'submit' })
      expect(submitButton).toBeEnabled()

      userEvent.click(submitButton)

      const title = screen.getByText(/your personality/i)
      expect(title).toBeInTheDocument()

      const buttonGoHome = screen.getByRole('button', /go home!/i)
      expect(buttonGoHome).toBeInTheDocument()
   })

   test('result Introvert', async () => {
      mockQuestionList = mockQuestionList.map((question) => ({ ...question, answer: 'A' }))

      render(<PersonalityTest />)

      const questionOptionToAnswer = await screen.findByRole('radio', {
         name: 'Think it’s more important to give them some of your time; work can wait',
      })

      userEvent.click(questionOptionToAnswer)
      const submitButton = screen.getByRole('button', { name: 'submit' })

      userEvent.click(submitButton)
      const testResultIntrovert = screen.getByText(/introvert/i)
      expect(testResultIntrovert).toBeInTheDocument()
   })

   test('result extrovert', async () => {
      mockQuestionList = mockQuestionList.map((question) => ({ ...question, answer: 'D' }))

      render(<PersonalityTest />)

      const questionOptionToAnswer = await screen.findByRole('radio', {
         name: 'Interrupt and explain that you are really busy at the moment',
      })

      userEvent.click(questionOptionToAnswer)
      const submitButton = screen.getByRole('button', { name: 'submit' })

      userEvent.click(submitButton)
      const testResultIntrovert = screen.getByText(/extrovert/i)
      expect(testResultIntrovert).toBeInTheDocument()
   })
})
