import { Carousel } from "react-bootstrap"
import {useState } from "react"
import { Link } from "react-router-dom"

const HomeCarousel = ({recipes, classes}) => {
    const [index, setIndex] = useState(0)
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    const recipesWithImages = recipes.filter((recipe) => recipe.image)
    const randomRecipes = []
    let maxLength = Math.min(4, recipesWithImages.length)
    console.log(maxLength)
    while (randomRecipes.length < maxLength){
        let randomIndex = Math.floor(Math.random() * recipesWithImages.length)
        let randomRecipe = recipesWithImages[randomIndex]
        if (!randomRecipes.includes(randomRecipe)){
            randomRecipes.push(randomRecipe)
        }
    }

    return (

        <Carousel className = {classes} activeIndex={index} onSelect={handleSelect}>
            {randomRecipes.map((recipe) => (
                <Carousel.Item key={recipe.id} style = {{maxHeight: `40vh`, overflow:`hidden`}}>
                    <img style = {{margin:`auto`}} className="d-block w-100" src={recipe.image} alt={recipe.name} />
                    <Link to = {`/recipes/${recipe.slug}`}>
                    <Carousel.Caption className = 'bg-purple w-100 carousel-inner-home' style = {{}}>
                        <h3>{recipe.name}</h3>

                    </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>

    )

}

export default HomeCarousel