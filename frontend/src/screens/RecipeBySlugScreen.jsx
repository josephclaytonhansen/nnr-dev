import React from "react"
import { useGetRecipeBySlugQuery } from "../slices/recipesApiSlice"
import {useParams} from "react-router-dom"
import Recipe from '../components/Recipe'
import Permissions from "../utils/Permissions"
import jwt from 'jwt-decode'
import { BASE_URL } from "../constants"
import { toast } from "react-toastify"
import { useState, useContext } from "react"
import { AuthContext } from "../utils/authContext"

const RecipeBySlug = () => {
    const { slug: recipeSlug } = useParams()
    const { data:recipe, isLoading, error } = useGetRecipeBySlugQuery(recipeSlug)
    sessionStorage.setItem("recipe", JSON.stringify(recipe))

    const [user, setUser] = useState("none")
    const [token, setToken] = useContext(AuthContext)
    let auth = sessionStorage.getItem("token")
    let complete = false
    const permissions = Permissions(auth, user, setUser, setToken, complete, jwt, BASE_URL, toast)

    return(
        <>
        {isLoading ? (<></>) : error ? (<></>) : recipe && (
            <>
            <Recipe recipe={recipe} permissions ={permissions}/>
            </>
        )}
        </>
        
    )
}

export default RecipeBySlug