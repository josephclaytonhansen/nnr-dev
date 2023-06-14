import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter  } from 'react-router-dom'
import AdminRecipesScreen from './screens/AdminRecipesScreen'
import CRUDRecipesScreen from './screens/admin/CRUDRecipesScreen'
import RecipeById from './screens/RecipeByIdScreen'
import RecipeBySlug from './screens/RecipeBySlugScreen'
import SearchResults from './screens/SearchResultsScreen'
import Tag from './screens/TagScreen'
import Cuisine from './screens/CuisineScreen'
import GlutenFree from './screens/GlutenFreeScreen'
import Vegetarian from './screens/VegetarianScreen'
import DogSafe from './screens/DogSafeScreen'
import Meal from './screens/MealScreen'
import ListAllRecipes from './screens/ListAllRecipesScreen'
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
          <Route path="/search/:query" component={withRouter(SearchResults)} />
          <Route path="/tags/:tag" component={withRouter(Tag)} />
          <Route path="/cuisines/:cuisine" component={withRouter(Cuisine)} />
          <Route path="/gluten-free" component={withRouter(GlutenFree)} />
          <Route path="/vegetarian" component={withRouter(Vegetarian)} />
          <Route path="/dog-safe" component={withRouter(DogSafe)} />
          <Route path="/meal/:meal" component={withRouter(Meal)} />
          <Route path="/recipes" component={withRouter(ListAllRecipes)} />

          <Route path="/admin/recipe/:id" component={withRouter(CRUDRecipesScreen)} />


          <Route path="/" component={withRouter(AdminRecipesScreen)} exact index={true} />
          
        </Switch>
    </Router>
    </>
  )
}

export default App
