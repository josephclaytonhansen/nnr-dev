import React from "react"
import { useGetRecipeBySlugQuery } from "../slices/recipesApiSlice"
import ReactMarkdown from "react-markdown"
import {Table, ListGroup, List, Row, Col} from "react-bootstrap"
import remarkGfm from "remark-gfm"
import {useParams} from "react-router-dom"
import Recipe from '../components/Recipe'

const RecipeBySlug = () => {
    const { slug: recipeSlug } = useParams()
    const { data:recipe, isLoading, error } = useGetRecipeBySlugQuery(recipeSlug)

    return(
        <Recipe recipe={recipe}/>
    )
}

export default RecipeBySlug