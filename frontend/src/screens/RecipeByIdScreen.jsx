import React from "react"
import { useGetRecipeByIdQuery } from "../slices/recipesApiSlice"
import ReactMarkdown from "react-markdown"
import {Table, ListGroup, List, Row, Col} from "react-bootstrap"
import remarkGfm from "remark-gfm"
import {useParams} from "react-router-dom"
import Recipe from '../components/Recipe'
import Ingredients from "../components/Ingredients"

const RecipeById = () => {
    const { id: recipeId } = useParams()
    const { data:recipe, isLoading, error } = useGetRecipeByIdQuery(recipeId)
    sessionStorage.setItem("recipe", JSON.stringify(recipe))

    return(
        <>
        {isLoading ? (<></>) : error ? (<></>) : recipe && (
            <>
            <Recipe recipe={recipe}/>
            </>
        )}
        </>
        
    )
}

export default RecipeById