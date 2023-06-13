import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter  } from 'react-router-dom'
import AdminRecipesScreen from './screens/AdminRecipesScreen'
import RecipeById from './screens/RecipeByIdScreen'
import RecipeBySlug from './screens/RecipeBySlugScreen'
import './css/App.css'
import Header from './components/Header'

function App() {
  return (
    <>
    <Header></Header>
    <Router>
      <Switch>
        
      <Route path="/recipes/id/:id" component={withRouter(RecipeById)} />
      <Route path="/recipes/:slug" component={withRouter(RecipeBySlug)} />
        <Route path="/" component={withRouter(AdminRecipesScreen)} exact index={true} />
        
        </Switch>
    </Router>
    </>
  )
}

export default App
