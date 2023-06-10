import React from "react"
import { useGetRecipesQuery } from "../slices/recipesApiSlice"
import ReactMarkdown from "react-markdown"
import {Table } from "react-bootstrap"
import remarkGfm from "remark-gfm"
import {Link} from "react-router-dom"

const AdminRecipesListScreen = () => {
    const {data: recipes, isLoading: loadingRecipes, error: errorRecipes} = useGetRecipesQuery()
    return(
        <>
            <h1>Recipes</h1>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>CONTENT</th>
                        </tr>
                </thead>
                <tbody>
                    {recipes && (recipes.map((recipe) => (
                        <tr key={recipe._id}>
                            <td>{recipe._id}</td>
                            <td><Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link></td>
                            <td>{<ReactMarkdown children={recipe.content} remarkPlugins={[remarkGfm]}></ReactMarkdown>}</td>
                        </tr>
                        
                    )))}
                    </tbody>
            </Table>
        </>
    )
}

export default AdminRecipesListScreen