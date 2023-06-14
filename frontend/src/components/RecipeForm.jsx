import React from 'react'
import {useCreateRecipeMutation, useUpdateRecipeMutation, useDeleteRecipeMutation, useGetRecipeByIdQuery} from '../slices/recipesApiSlice'
import {toast } from 'react-toastify'
import { useEffect } from 'react'
import Internal from './RecipeForm/Form'

const RecipeForm = ({recipe}) => {
    let data = JSON.parse(JSON.stringify(recipe))

    const [updateRecipe, {isLoading: loadingUpdateRecipe}] = useUpdateRecipeMutation()
    const [createRecipe, {isLoading: loadingCreateRecipe}] = useCreateRecipeMutation()
    const [deleteRecipe, {isLoading: loadingDeleteRecipe}] = useDeleteRecipeMutation()

    return(
        <Internal recipe={data}/>
    )
}

export default RecipeForm