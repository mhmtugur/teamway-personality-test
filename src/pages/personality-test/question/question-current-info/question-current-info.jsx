import { Box } from '@material-ui/core'
import colors from '../../../../theme/colors'

const QuestionCurrentInfo = ({ currentIndex, questionCount }) => {
   return (
      <Box fontSize={20} color={colors.pink} fontWeight={300}>
         {`QUESTION ${currentIndex} OF ${questionCount}`}
      </Box>
   )
}

export default QuestionCurrentInfo
