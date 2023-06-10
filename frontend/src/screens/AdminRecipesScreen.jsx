import React from "react"
import { useGetRecipesQuery } from "../slices/recipesApiSlice"

const AdminRecipesListScreen = () => {
    const {data: recipes, isLoading: loadingRecipes, error: errorRecipes} = useGetRecipesQuery()
    return(
        <>
            <h1>Recipes</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        </tr>
                </thead>
                <tbody>
                    {recipes && (recipes.map((recipe) => (
                        <tr key={recipe._id}>
                            <td>{recipe._id}</td>
                            <td>{recipe.name}</td>
                        </tr>
                        
                    )))}
                    </tbody>
            </table>
        </>
    )
}

export default AdminRecipesListScreen