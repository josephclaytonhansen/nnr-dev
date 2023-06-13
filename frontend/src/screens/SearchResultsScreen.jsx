import React from "react"
import { useParams } from "react-router"
import { useGetRecipesBySearchQuery } from "../slices/recipesApiSlice"


const SearchResults = () => {
    const {query} = useParams()
    const {data:recipes, isLoading, error} = useGetRecipesBySearchQuery(query)
    return(
        <>
        {query} {recipes && JSON.stringify(recipes)}
        </>
    )
}

export default SearchResults