import { useGetRecipesQuery } from "../../slices/recipesApiSlice"
import { useParams } from "react-router"
import React from "react"
import { Container } from "react-bootstrap"
import Loader from "../../components/Loader"
import AdminList from "./AdminList"
import Message from "../../components/Message"

const AdminListAllRecipes = () => {
    const {data:recipes, isLoading, error} = useGetRecipesQuery()
    if (recipes){
        sessionStorage.setItem("recipes", JSON.stringify(recipes))
    }
    return(
        <main>
            <Container>
            <h1 style = {{marginBottom: "2rem"}}>All recipes</h1>
                {recipes ? (
                    <AdminList/>
                ) : isLoading ? (
                    <Loader/>
                ) : error ? (
                    <>
                    <Message variant='dark'>{error.error}{error.data.message}</Message>
                    <AdminList/>
                    </>
                ) : (
                    `error`
                )}

            </Container>
        </main>
    )
}


export default AdminListAllRecipes