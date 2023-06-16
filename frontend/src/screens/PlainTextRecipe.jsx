import React from "react"
import { useGetRecipeBySlugPlainTextQuery } from "../slices/recipesApiSlice"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"

const PlainTextRecipe = ({}) => {
    const { slug: recipeSlug } = useParams()
    const { data:recipe, isLoading, error } = useGetRecipeBySlugPlainTextQuery(recipeSlug)
    sessionStorage.setItem("recipe", JSON.stringify(recipe))
    return(
        <main>
        {recipe && (
            <Container>
            <h1>
                {recipe.name}

            </h1>
            <h2>
                Ingredients
            </h2>
            <ul>
                {recipe.ingredients.map((ingredient) => (
                    <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                ))}
            </ul>
            <h2>
                Instructions
            </h2>
            <ol>
                {recipe.instructions.map((instruction) => (
                    <li>{instruction.name} {instruction.details}</li>
                ))}
            </ol>
            </Container>
        )}
        </main>
    )
}

export default PlainTextRecipe