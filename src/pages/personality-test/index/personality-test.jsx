import { Box } from '@material-ui/core'
import shadows from '@material-ui/core/styles/shadows'
import { useEffect } from 'react'
import styled from 'styled-components'

import Title from '../../../components/title/title'
import {
   questionActionEnums,
   testStatus,
   useQuestionContext,
} from '../../../context/question-context'
import { getQuestionList } from '../../../service/question'
import Question from '../question/index/question'
import Result from '../result/result'

const StyledQuestionContainer = styled(Box)`
   max-width: 720px;
   padding: 48px 32px;
   box-shadow: ${shadows[1]};
   border: 1px solid white;
   border-radius: 5px;
`

const PersonalityTest = () => {
   const { questionState, dispatchQuestion } = useQuestionContext()

   useEffect(() => {
      const loadQuestionList = async () => {
         let data = await getQuestionList()
         data = data.map((question, index) => {
            return { ...question, index }
         })

         dispatchQuestion({
            type: questionActionEnums.START_TEST,
            questions: data,
         })
      }
      loadQuestionList()
   }, [dispatchQuestion])

   return (
      <Box display={'flex'} justifyContent={'center'} pt={'5%'} pb={6}>
         {questionState.questions.length === 0 ? (
            <>Loading...</>
         ) : questionState.testStatus === testStatus.COMPLETED ? (
            <Result />
         ) : (
            <Box>
               <Box mb={4}>
                  <Title>Are you an introvert or an extrovert?</Title>
               </Box>
               <StyledQuestionContainer>
                  <Question />
               </StyledQuestionContainer>
            </Box>
         )}
      </Box>
   )
}

export default PersonalityTest
