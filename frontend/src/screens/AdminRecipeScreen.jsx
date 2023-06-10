import React from "react"
import { useGetRecipeByIdQuery } from "../slices/recipesApiSlice"
import ReactMarkdown from "react-markdown"
import {Table, ListGroup, List, Row, Col} from "react-bootstrap"
import remarkGfm from "remark-gfm"
import {useParams} from "react-router-dom"

const AdminRecipeScreen = () => {
    const { id: recipeId } = useParams()
    const { data:recipe, isLoading, error } = useGetRecipeByIdQuery(recipeId)
    return(
        <>
            <h1>{recipe.name}</h1>
            <ListGroup>
                {recipe.ingredients && (recipe.ingredients.map((ingredient) => (
                    <ListGroup.Item key={ingredient._id}>
                        JSON.stringify(ingredient)
                    </ListGroup.Item>

                )))}
            </ListGroup>
                    


        </>
    )
}

export default AdminRecipeScreen