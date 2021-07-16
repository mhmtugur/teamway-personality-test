import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { QuestionProvider } from '../context/question-context'
import Main from '../pages/main/main'
import PersonalityTest from '../pages/personality-test/index/personality-test'

const Routes = () => (
   <Router>
      <Switch>
         <Route exact path={['/', '/personality-test']}>
            <QuestionProvider>
               <Route exact path={'/'} component={Main} />
               <Route exact path={'/personality-test'} component={PersonalityTest} />
            </QuestionProvider>
         </Route>
         <Route component={() => <>Not Found</>} />
      </Switch>
   </Router>
)

export default Routes
