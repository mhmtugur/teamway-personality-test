import { Box, Button } from '@material-ui/core'
import {
   questionActionEnums,
   testStatus,
   useQuestionContext,
} from '../../../../context/question-context'

const QuestionActionItems = () => {
   const { questionState, dispatchQuestion } = useQuestionContext()

   const onPrevious = () =>
      dispatchQuestion({
         type: questionActionEnums.PREVIOUS_QUESTION,
      })

   const onNext = () =>
      dispatchQuestion({
         type: questionActionEnums.NEXT_QUESTION,
      })

   const onSubmit = () => dispatchQuestion({ type: questionActionEnums.SUBMIT_TEST })

   const previousDisabled = questionState.currentIndex === 0
   const nextDisabled = questionState.currentIndex === questionState.questions.length - 1
   const submitEnabled = questionState.testStatus === testStatus.READY_TO_SUBMIT

   return (
      <Box display={'flex'} justifyContent={'space-between'}>
         <Box display={'flex'}>
            <Box pr={2}>
               <Button color={'secondary'} onClick={onPrevious} disabled={previousDisabled}>
                  previous
               </Button>
            </Box>
            <Box>
               <Button
                  variant={'contained'}
                  color={'secondary'}
                  onClick={onNext}
                  disabled={nextDisabled}>
                  next
               </Button>
            </Box>
         </Box>
         <Box>
            <Button
               variant={'contained'}
               color={'secondary'}
               onClick={onSubmit}
               disabled={!submitEnabled}>
               submit
            </Button>
         </Box>
      </Box>
   )
}

export default QuestionActionItems
