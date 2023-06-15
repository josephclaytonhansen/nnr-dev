import React from 'react'
import Internal from './RecipeForm/Form'

const RecipeForm = ({recipe}) => {
    let data = JSON.parse(JSON.stringify(recipe))

    return(
        <Internal recipe={data}/>
    )
}

export default RecipeForm