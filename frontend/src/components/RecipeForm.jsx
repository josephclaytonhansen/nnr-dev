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

    const submitHandler = async(e) => {
        e.preventDefault()
        if(data._id){
            try{
                const res = await updateRecipe(data._id, data).unwrap()
                toast.success("Recipe updated")
            } catch(err){
                toast.error(err?.data?.message || err.error)
            }
        } else {
            try{
                const res = await createRecipe(data).unwrap()
                toast.success("Recipe created")
            } catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    const deleteHandler = async(e) => {
        e.preventDefault()
        if(data._id){
            try{
                const res = await deleteRecipe(data._id).unwrap()
                toast.success("Recipe deleted")
            } catch(err){
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    return(
        <Internal recipe={data} submit={submitHandler} deleteF={deleteHandler}/>
    )
}

export default RecipeForm