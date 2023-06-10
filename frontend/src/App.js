import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter  } from 'react-router-dom'
import AdminRecipesScreen from './screens/AdminRecipesScreen'
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={withRouter(AdminRecipesScreen)} exact index={true} />
        </Switch>
    </Router>
  )
}

export default App
