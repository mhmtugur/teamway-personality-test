import { Box } from '@material-ui/core'
import { useQuestionContext } from '../../../../context/question-context'
import colors from '../../../../theme/colors'

const QuestionCurrentInfo = () => {
   const { questionState } = useQuestionContext()

   return (
      <Box fontSize={20} color={colors.pink} fontWeight={300}>
         {`QUESTION ${questionState.currentIndex + 1} OF ${questionState.questions.length}`}
      </Box>
   )
}

export default QuestionCurrentInfo
