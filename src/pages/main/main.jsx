import { Box, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Title from '../../components/title/title'

const Main = () => {
   const history = useHistory()

   const getStartedNow = () => history.push('/personality-test')

   return (
      <Box display={'flex'} justifyContent={'center'} pt={'5%'} pb={6}>
         <Box>
            <Title>Check Your Personality</Title>
            <Box display={'flex'} justifyContent={'center'} pt={10}>
               <Button variant={'contained'} color={'secondary'} fullWidth onClick={getStartedNow}>
                  get started now
               </Button>
            </Box>
         </Box>
      </Box>
   )
}

export default Main
