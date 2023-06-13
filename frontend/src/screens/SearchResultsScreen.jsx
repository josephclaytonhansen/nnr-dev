import React from "react"
import { useParams } from "react-router"
import { useGetRecipesBySearchQuery } from "../slices/recipesApiSlice"
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap"
import Loader from "../components/Loader"
import RecipeList from "../components/RecipeList"
import Message from "../components/Message"
import {toast} from "react-toastify"


const SearchResults = () => {
    const {query} = useParams()
    const {data:recipes, isLoading, error} = useGetRecipesBySearchQuery(query)
    if (recipes){
        sessionStorage.setItem("recipes", JSON.stringify(recipes))
    }
    return(
        <main>
            <Container>
            <h1 style = {{marginBottom: "2rem"}}>Search results for '{query}'</h1>
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

export default SearchResults