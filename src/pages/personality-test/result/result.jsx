import { Box, Button } from '@material-ui/core'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Title from '../../../components/title/title'
import { questionActionEnums, useQuestionContext } from '../../../context/question-context'

const Result = () => {
   const { questionState, dispatchQuestion } = useQuestionContext()
   const history = useHistory()

   const getTestResult = () => {
      if (questionState.questions.length < 1) {
         return 'INCOMPLETED'
      }
      let introvert = 0
      let extrovert = 0

      questionState.questions.forEach((question) => {
         const { introvertPoint, extrovertPoint } = question.options.find(
            (option) => option.value === question.answer
         )

         introvert += introvertPoint
         extrovert += extrovertPoint
      })

      return introvert > extrovert ? 'INTROVERT' : 'EXTROVERT'
   }

   const goHome = () => history.push('/')

   useEffect(() => {
      const cleanUp = () => {
         dispatchQuestion({
            type: questionActionEnums.CLEAR_TEST,
         })
      }
      return cleanUp
   }, [dispatchQuestion])

   return (
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
         <Box>
            <Title>Your Personality</Title>
            <Box fontSize={24} textAlign={'center'} py={3}>
               {getTestResult()}
            </Box>
            <Box display={'flex'} justifyContent={'center'}>
               <Button variant={'text'} color={'secondary'} onClick={goHome}>
                  go home!
               </Button>
            </Box>
         </Box>
      </Box>
   )
}

export default Result
