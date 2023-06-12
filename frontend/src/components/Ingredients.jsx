import React from 'react'
import { Link } from 'react-router-dom'
import {} from 'react-bootstrap'
import {} from 'react-icons/fa'

const Ingredients = (recipe) => {
    return (
        <>
            {recipe && recipe.ingredients.map((ingredient, index) => {
                //name, amount, and unit
                //unit ? "single" : !unit
                //amount unit name 
                
            })}
        </>
    )
}

export default Ingredients