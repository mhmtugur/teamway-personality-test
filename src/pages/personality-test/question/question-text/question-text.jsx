import { Box } from '@material-ui/core'
import { useQuestionContext } from '../../../../context/question-context'

const QuestionText = () => {
   const { questionState } = useQuestionContext()

   return (
      <Box height={60} fontSize={20} fontWeight={700} fontStyle={'italic'}>
         {questionState.questions[questionState.currentIndex].text}
      </Box>
   )
}

export default QuestionText
