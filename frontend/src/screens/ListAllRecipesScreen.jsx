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
import Permissions from "../utils/Permissions"

const ListAllRecipes = () => {
    const {data:data, isLoading, error} = useGetRecipesQuery()
    const [user, setUser] = useState("none")
    const recipes = data?.recipes
    const [token, setToken] = useContext(AuthContext)
    let auth = sessionStorage.getItem("token")
    let complete = false


    if (recipes){
        sessionStorage.setItem("recipes", JSON.stringify(recipes))
        Permissions(auth, user, setUser, setToken, complete, jwt, BASE_URL, toast)
    }

    return(
        <main>
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