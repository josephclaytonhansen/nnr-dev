import { useGetRecipesQuery } from "../slices/recipesApiSlice"
import { useGetUserByIdQuery } from "../slices/usersApiSlice"
import { useParams } from "react-router"
import {useState, useContext } from "react"
import React from "react"
import { Container } from "react-bootstrap"
import Loader from "../components/Loader"
import RecipeList from "../components/RecipeList"
import Message from "../components/Message"
import jwt from 'jwt-decode'
import { AuthContext } from "../utils/authContext"
import { BASE_URL } from "../constants"
import { toast } from "react-toastify"

const ListAllRecipes = () => {
    const {data:data, isLoading, error} = useGetRecipesQuery()
    const [user, setUser] = useState("none")
    const recipes = data?.recipes
    const [token, setToken] = useContext(AuthContext)
    console.log(sessionStorage.getItem("token"))
    let auth = sessionStorage.getItem("token")
    let complete = false


    if (recipes){
        sessionStorage.setItem("recipes", JSON.stringify(recipes))
    }
    if (auth && user === "none" && !complete && sessionStorage.getItem("token") != null){
        const decode = jwt(auth)
        const session = decode.session
        const auser = decode.user
        console.log(decode)
        complete = true
        
        if (auser && user === "none"){
            fetch(`${BASE_URL}/api/users/${auser}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }).then((res) => res.json())
            .then((responseJSON) => {

                    setUser(responseJSON)
                    console.log(responseJSON, user)
                    const userAuthSession = user.authSession

            }).catch(e => {
                if (! toast.isActive('error')){
                toast.error(e.message, {toastId: 'error'})}
            })
            
        }
    }
    

    return(
        <main>
            {user && user}
            <Container>
            <h1 style = {{marginBottom: "2rem"}}>All recipes</h1>
                {recipes ? (
                    <RecipeList/>
                ) : isLoading ? (
                    <Loader/>
                ) : error ? (
                    <>
                    <Message variant='dark'>There has been an error; showing cached recipes. Please refresh the page.</Message>
                    <RecipeList/>
                    </>
                ) : (
                    `error`
                )}

            </Container>
        </main>
    )
}


export default ListAllRecipes