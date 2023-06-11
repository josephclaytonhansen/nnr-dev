import React from "react"

const Recipe = ({recipe}) => {
    return(
        <>
        {recipe && (
            <h1>{recipe.name}</h1>
        )}
                    
        </>
    )
}

export default Recipe