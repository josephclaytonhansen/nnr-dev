import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter  } from 'react-router-dom'
import AdminRecipesScreen from './screens/AdminRecipesScreen'
import AdminListAllRecipes from './screens/admin/AdminListAllRecipes'
import AdminScreen from './screens/admin/AdminScreen'
import CRUDRecipesScreen from './screens/admin/CRUDRecipesScreen'
import RecipeById from './screens/RecipeByIdScreen'
import RecipeBySlug from './screens/RecipeBySlugScreen'
import PlainTextRecipe from './screens/PlainTextRecipe'
import SearchResults from './screens/SearchResultsScreen'
import Tag from './screens/TagScreen'
import Cuisine from './screens/CuisineScreen'
import GlutenFree from './screens/GlutenFreeScreen'
import Home from './screens/HomeScreen'
import Vegetarian from './screens/VegetarianScreen'
import DogSafe from './screens/DogSafeScreen'
import Meal from './screens/MealScreen'
import Why from './screens/WhyScreen'
import UserLogin from './screens/UserLoginScreen'
import UserRegister from './screens/UserRegisterScreen'
import ListAllRecipes from './screens/ListAllRecipesScreen'
import './css/App.css'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <Header></Header>
    <Router>
        <Switch>

          <Route path="/recipes/id/:id" component={withRouter(RecipeById)} />
          <Route path="/recipes/plain-text/:slug" component={withRouter(PlainTextRecipe)}/>
          <Route path="/recipes/:slug" component={withRouter(RecipeBySlug)} />
          <Route path="/search/:query" component={withRouter(SearchResults)} />
          <Route path="/tags/:tag" component={withRouter(Tag)} />
          <Route path="/cuisines/:cuisine" component={withRouter(Cuisine)} />
          <Route path="/gluten-free" component={withRouter(GlutenFree)} />
          <Route path="/vegetarian" component={withRouter(Vegetarian)} />
          <Route path="/dog-safe" component={withRouter(DogSafe)} />
          <Route path="/meal/:meal" component={withRouter(Meal)} />
          <Route path="/recipes" component={withRouter(ListAllRecipes)} />

          <Route path="/why" component={withRouter(Why)}/>

          <Route path="/register" component={withRouter(UserRegister)} />
          <Route path="/login" component={withRouter(UserLogin)} />

          <Route path="/admin/recipe/:id" component={withRouter(CRUDRecipesScreen)} />
          <Route path="/admin/recipes" component={withRouter(AdminListAllRecipes)} />
          <Route path="/admin" component={withRouter(AdminScreen)} />


          <Route path="/" component={withRouter(Home)} exact index={true} />
          
        </Switch>
        <Footer></Footer>
    </Router>
    
    </>
  )
}

export default App
