import { Box } from '@material-ui/core'
import styled from 'styled-components'

const StyledTransitionBox = styled(Box)`
   transition: all 750ms ease-out;
`

const StyledProgressRadioText = styled(Box)`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 40px;
   position: absolute;
   font-size: 24px;
`

const ProgressBar = ({ progressRatio, color }) => {
   const roundedRatio = progressRatio > 100 ? 100 : progressRatio

   return (
      <Box
         display={'flex'}
         height={40}
         border={`1px solid ${color}`}
         position={'relative'}
         borderRadius={5}>
         <StyledProgressRadioText>{`${roundedRatio}%`}</StyledProgressRadioText>
         <StyledTransitionBox flex={roundedRatio} bgcolor={color} />
         <StyledTransitionBox flex={100 - roundedRatio} />
      </Box>
   )
}

export default ProgressBar
