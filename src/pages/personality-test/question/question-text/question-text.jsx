import { Box } from '@material-ui/core'

const QuestionText = ({ question }) => {
   return (
      <Box height={60} fontSize={20} fontWeight={700} fontStyle={'italic'}>
         {question.text}
      </Box>
   )
}

export default QuestionText
