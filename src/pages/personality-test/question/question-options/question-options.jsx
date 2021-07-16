import { Box, Radio, RadioGroup } from '@material-ui/core'
import { questionActionEnums, useQuestionContext } from '../../../../context/question-context'

const QuestionOptions = () => {
   const { questionState, dispatchQuestion } = useQuestionContext()

   const answerQuestion = (e) => {
      dispatchQuestion({
         type: questionActionEnums.ANSWER_QUESTION,
         answer: e.target.value,
      })
   }

   return (
      <RadioGroup
         value={questionState.questions[questionState.currentIndex].answer || ''}
         onChange={answerQuestion}>
         <Box>
            {questionState.questions[questionState.currentIndex].options.map((option) => {
               return (
                  <Box key={option.value} display={'flex'} alignItems={'center'}>
                     <Radio id={option.value} value={option.value} />
                     <label htmlFor={option.value}>{option.content}</label>
                  </Box>
               )
            })}
         </Box>
      </RadioGroup>
   )
}

export default QuestionOptions
