import React from "react"
import { useGetRecipesQuery, useGetRandomRecipeQuery, useGetRecipesByMealQuery,
useGetRecipesByAuthorQuery, useGetRecipesByCuisineQuery, useGetRecipesByIngredientQuery,
useGetRecipesByTagQuery, useGetRecipesVegetarianQuery, useGetRecipesGlutenFreeQuery} from "../slices/recipesApiSlice"
import ReactMarkdown from "react-markdown"
import {Table, Row, Col, Container, ListGroup } from "react-bootstrap"
import remarkGfm from "remark-gfm"
import {Link} from "react-router-dom"

const AdminRecipesListScreen = () => {

    return(
        <Container>
   
        </Container>
    )
}

export default AdminRecipesListScreen