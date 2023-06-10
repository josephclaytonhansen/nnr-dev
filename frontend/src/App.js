import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter  } from 'react-router-dom'
import AdminRecipesScreen from './screens/AdminRecipesScreen'
import AdminRecipeScreen from './screens/AdminRecipeScreen'

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/recipes/:id" component={withRouter(AdminRecipeScreen)} />
        <Route path="/" component={withRouter(AdminRecipesScreen)} exact index={true} />
        </Switch>
    </Router>
  )
}

export default App
