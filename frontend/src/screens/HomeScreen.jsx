import { useGetRecipesQuery } from "../slices/recipesApiSlice"
import React from "react"
import { Container, Card, Row, Col } from "react-bootstrap"
import Loader from "../components/Loader"
import Message from "../components/Message"
import HomeCarousel from "../components/Carousel"

const Home = () => {
    const {data:data, isLoading, error} = useGetRecipesQuery()
    const recipes = data?.recipes
    
    if (recipes){
        sessionStorage.setItem("recipes", JSON.stringify(recipes))
    }
    
    return(
        <main>
            {recipes ? (
                <Container>
                    <HomeCarousel recipes={recipes} classes="home-carousel"/>
                </Container>

            ) : isLoading ? (
                <Loader/>
                //REPLACE
            ): (
                <Message variant='dark'>There has been an error; please refresh the page.</Message>
            )}
            
        </main>
    )
}

export default Home