import { useGetRecipesByCuisineQuery } from "../slices/recipesApiSlice"
import { useParams } from "react-router"
import React from "react"
import { Container } from "react-bootstrap"
import Loader from "../components/Loader"
import RecipeList from "../components/RecipeList"
import Message from "../components/Message"

const Cuisine = () => {
    const {cuisine} = useParams()
    const {data:recipes, isLoading, error} = useGetRecipesByCuisineQuery(cuisine)
    if (recipes){
        sessionStorage.setItem("recipes", JSON.stringify(recipes))
    }
    return(
        <main>
            <Container>
            <h1 style = {{marginBottom: "2rem"}}>{cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} recipes</h1>
                {recipes ? (
                    <RecipeList/>
                ) : isLoading ? (
                    <Loader/>
                ) : error ? (
                    <>
                    <Message variant='dark'>There has been an error; showing cached data</Message>
                    <RecipeList/>
                    </>
                ) : (
                    `error`
                )}

            </Container>
        </main>
    )
}


export default Cuisine