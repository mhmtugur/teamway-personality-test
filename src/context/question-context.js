import React, { useReducer } from 'react'

const questionActionEnums = {
   START_TEST: 'START_TEST',
   PREVIOUS_QUESTION: 'PREVIOUS_QUESTION',
   NEXT_QUESTION: 'NEXT_QUESTION',
   ANSWER_QUESTION: 'ANSWER_QUESTION',
   CLEAR_TEST: 'CLEAR_TEST',
   SUBMIT_TEST: 'SUBMIT_TEST',
}

export const testStatus = {
   RUNNING: 'RUNNING',
   READY_TO_SUBMIT: 'READY_TO_SUBMIT',
   COMPLETED: 'COMPLETED',
}

export const initialQuestionState = {
   questions: [],
   currentIndex: 0,
   testStatus: testStatus.RUNNING,
}

const questionReducer = (state, action) => {
   switch (action.type) {
      case questionActionEnums.START_TEST:
         return { ...initialQuestionState, questions: action.questions }
      case questionActionEnums.PREVIOUS_QUESTION:
         return { ...state, currentIndex: state.currentIndex - 1 }
      case questionActionEnums.NEXT_QUESTION:
         return { ...state, currentIndex: state.currentIndex + 1 }
      case questionActionEnums.ANSWER_QUESTION:
         const questions = state.questions.map((question) =>
            question.index === state.currentIndex
               ? { ...question, answer: action.answer }
               : question
         )
         return {
            ...state,
            questions,
            testStatus: questions.some((question) => !question.answer)
               ? testStatus.RUNNING
               : testStatus.READY_TO_SUBMIT,
         }
      case questionActionEnums.SUBMIT_TEST:
         return { ...state, testStatus: testStatus.COMPLETED }
      case questionActionEnums.CLEAR_TEST:
         return initialQuestionState
      default:
         return state
   }
}

const QuestionContext = React.createContext(initialQuestionState)

const useQuestionContext = () => React.useContext(QuestionContext)

const QuestionProvider = (props) => {
   const [questionState, dispatchQuestion] = useReducer(questionReducer, initialQuestionState)
   return (
      <QuestionContext.Provider value={{ questionState, dispatchQuestion }}>
         {props.children}
      </QuestionContext.Provider>
   )
}

export { useQuestionContext, QuestionProvider, questionActionEnums }
