import { useGetRecipesVegetarianQuery } from "../slices/recipesApiSlice"
import { useParams } from "react-router"
import React from "react"
import { Container } from "react-bootstrap"
import Loader from "../components/Loader"
import RecipeList from "../components/RecipeList"
import Message from "../components/Message"

const Vegetarian = () => {
    const {data:recipes, isLoading, error} = useGetRecipesVegetarianQuery()
    if (recipes){
        sessionStorage.setItem("recipes", JSON.stringify(recipes))
    }
    return(
        <main>
            <Container>
            <h1 style = {{marginBottom: "2rem"}}>Vegetarian recipes</h1>
                {recipes ? (
                    <RecipeList/>
                ) : isLoading ? (
                    <Loader/>
                ) : error ? (
                    <>
                    <Message variant='dark'>There has been an error; showing cached recipes. Please refresh the page.</Message>
                    <RecipeList/>
                    </>
                ) : (
                    `error`
                )}

            </Container>
        </main>
    )
}


export default Vegetarian