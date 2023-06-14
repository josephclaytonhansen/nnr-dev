import React from 'react'
import { Link } from 'react-router-dom'
import {ListGroup, Row, Col, InputGroup, Form, Container, Badge} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {useGetRecipeByIdQuery} from '../../slices/recipesApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {toast } from 'react-toastify'
import 'balloon-css'
import RecipeForm from '../../components/RecipeForm'

const CRUDRecipesScreen = () => {
    const {id} = useParams()
    const {data: recipe, isLoading, error} = useGetRecipeByIdQuery(id)

    return(
        <main>
        {isLoading ? (
            <Loader/>
        ) : error ? (
            <Message variant='danger'>Recipe not found</Message>
        ) : recipe ? (
            <>
            <RecipeForm recipe={recipe}/>
            </>
        ) : (
            <Message variant='danger'>Recipe not found</Message>
        )}
        
        </main>
    )
}

export default CRUDRecipesScreen