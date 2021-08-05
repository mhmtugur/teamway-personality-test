import { Box } from '@material-ui/core'
import { useQuestionContext } from '../../../../context/question-context'
import colors from '../../../../theme/colors'
import ProgressBar from '../../../../components/progress-bar/progress-bar'
import QuestionActionItems from '../question-action-items/question-action-items'
import QuestionCurrentInfo from '../question-current-info/question-current-info'
import QuestionOptions from '../question-options/question-options'
import QuestionText from '../question-text/question-text'

const Question = () => {
   const { questionState } = useQuestionContext()

   const getProgressRatio = () => {
      const answeredQuestionsLength = questionState.questions.filter(
         (question) => question.answer
      ).length

      return Math.round((answeredQuestionsLength / questionState.questions.length) * 100)
   }

   return (
      <Box>
         <Box mb={3}>
            <ProgressBar color={colors.pink} progressRatio={getProgressRatio()} />
         </Box>
         <Box mb={3}>
            <QuestionCurrentInfo />
         </Box>
         <QuestionText />
         <Box mb={3}>
            <QuestionOptions />
         </Box>
         <QuestionActionItems />
      </Box>
   )
}

export default Question
