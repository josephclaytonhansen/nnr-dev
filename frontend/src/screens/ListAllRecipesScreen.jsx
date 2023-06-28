import { useGetRecipesQuery } from "../slices/recipesApiSlice"
import { useGetUserByIdQuery } from "../slices/usersApiSlice"
import { useParams } from "react-router"
import {useState } from "react"
import React from "react"
import { Container } from "react-bootstrap"
import Loader from "../components/Loader"
import RecipeList from "../components/RecipeList"
import Message from "../components/Message"
import jwt from 'jwt-decode'

const ListAllRecipes = () => {
    const {data:data, isLoading, error} = useGetRecipesQuery()
    const {user, setUser} = useState("none")
    const recipes = data?.recipes
    const token = data?.token


    if (recipes){
        sessionStorage.setItem("recipes", JSON.stringify(recipes))
    }
    if (token){
        const decode = jwt(token)
        const session = decode.session
        user = decode.user
        
        if (user){
            const userAuthSession = user.authSession
            if (userAuthSession._id == session._id){
                setUser(user)
                fetch(`/api/users/${user._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                }).then((res) => {
                    if (res.status === 200) {
                        setUser(res.json())

                    }
                })
            }
        }
    }
    

    return(
        <main>
            {user && user}
            <Container>
            <h1 style = {{marginBottom: "2rem"}}>All recipes</h1>
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


export default ListAllRecipes