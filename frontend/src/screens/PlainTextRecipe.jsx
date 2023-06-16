import React from "react"
import { useGetRecipeBySlugQuery } from "../slices/recipesApiSlice"
import { useParams } from "react-router-dom"

const PlainTextRecipe = ({}) => {
    const { slug: recipeSlug } = useParams()
    const { data:recipe, isLoading, error } = useGetRecipeBySlugQuery(recipeSlug)
    sessionStorage.setItem("recipe", JSON.stringify(recipe))
    return(
        <>
        {recipe && (
            <p>
                {recipe.name}
                
            </p>
        )}
        </>
    )
}

export default PlainTextRecipe