import QuestionList from '../data/questions.json'

export const getQuestionList = () => {
   return Promise.resolve(QuestionList)
}
