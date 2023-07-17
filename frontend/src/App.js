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
import Contact from './screens/ContactScreen'
import Contribute from './screens/ContributeScreen'
import UserLogin from './screens/UserLoginScreen'
import UserPage from './screens/UserPageScreen'
import UserRegister from './screens/UserRegisterScreen'
import AdminListAllUsers from './screens/admin/AdminListAllUsers'
import ListAllRecipes from './screens/ListAllRecipesScreen'
import './css/App.css'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Permissions from './utils/Permissions'
import AdminButtons from './components/AdminButtons'
import jwt from 'jwt-decode'
import { toast } from 'react-toastify'
import { BASE_URL } from './constants'
import { useState } from 'react'


function App() {
  let complete = false
  let auth = sessionStorage.getItem('token')
  let [user, setUser] = useState('none')
  let [token, setToken] = useState('none')
  let permissions = Permissions(auth, user, setUser, setToken, complete, jwt, BASE_URL, toast)
  
  return (
    <>
    {auth && <AdminButtons permissions={permissions}/>}
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
          <Route path="/contribute" component={withRouter(Contribute)} />
          <Route path="/contact" component={withRouter(Contact)} />


          <Route path="/register" component={withRouter(UserRegister)} />
          <Route path="/login" component={withRouter(UserLogin)} />
          <Route path='/user' component={withRouter(UserPage)} />

          <Route path="/edit/:id" component={withRouter(CRUDRecipesScreen)} />
          <Route path="/admin-recipes" component={withRouter(AdminListAllRecipes)} />
          <Route path="/admin-users" component={withRouter(AdminListAllUsers)} />


          <Route path="/" component={withRouter(Home)} exact index={true} />
          
        </Switch>
        <Footer></Footer>
        
    </Router>

    
    </>
  )
}

export default App
