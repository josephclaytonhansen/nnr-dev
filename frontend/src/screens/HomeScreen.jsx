import { useGetRecipesQuery } from "../slices/recipesApiSlice"
import React from "react"
import { Container, Card, Row, Col, Button } from "react-bootstrap"
import Loader from "../components/Loader"
import Message from "../components/Message"
import HomeCarousel from "../components/Carousel"
import StarRating from "../components/StarRating"
import GFV from "../components/GFV"
import {Link} from "react-router-dom"

const Home = () => {
    const {data:data, isLoading, error} = useGetRecipesQuery()
    const recipes = data?.recipes
    
    if (recipes){
        sessionStorage.setItem("recipes", JSON.stringify(recipes))
    }
    const breakfast = recipes?.filter((recipe) => recipe.meal.toLowerCase() === 'breakfast').length > 0
    const lunch = recipes?.filter((recipe) => recipe.meal.toLowerCase() === 'lunch').length > 0
    const dinner = recipes?.filter((recipe) => recipe.meal.toLowerCase() === 'dinner').length > 0
    const dessert = recipes?.filter((recipe) => recipe.meal.toLowerCase() === 'dessert').length > 0
    const snack = recipes?.filter((recipe) => recipe.meal.toLowerCase() === 'snack').length > 0
    const american = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'american').length > 0
    const brazilian = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'brazilian').length > 0
    const chinese = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'chinese').length > 0
    const english = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'english').length > 0
    const french = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'french').length > 0
    const german = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'german').length > 0
    const greek = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'greek').length > 0
    const indian = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'indian').length > 0
    const italian = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'italian').length > 0
    const japanese = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'japanese').length > 0
    const korean = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'korean').length > 0
    const mexican = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'mexican').length > 0
    const moroccan = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'moroccan').length > 0
    const thai = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'thai').length > 0
    const vietnamese = recipes?.filter((recipe) => recipe.cuisine.toLowerCase() === 'vietnamese').length > 0


    const toAll = () => {
        window.location.href = '/recipes'
    }

    const toBreakfast = () => {
        window.location.href = '/meal/breakfast'
    }

    const toLunch = () => {
        window.location.href = '/meal/lunch'
    }

    const toDinner = () => {
        window.location.href = '/meal/dinner'
    }

    const toDessert = () => {
        window.location.href = '/meal/dessert'
    }

    const toSnacks = () => {
        window.location.href = '/meal/snack'
    }

    const toAmerican = () => {
        window.location.href = '/cuisines/american'
    }

    const toBrazilian = () => {
        window.location.href = '/cuisines/brazilian'
    }

    const toChinese = () => {
        window.location.href = '/cuisines/chinese'
    }

    const toEnglish = () => {
        window.location.href = '/cuisines/english'
    }

    const toFrench = () => {
        window.location.href = '/cuisines/french'
    }

    const toGerman = () => {
        window.location.href = '/cuisines/german'
    }

    const toGreek = () => {
        window.location.href = '/cuisines/greek'
    }

    const toIndian = () => {
        window.location.href = '/cuisines/indian'
    }

    const toItalian = () => {
        window.location.href = '/cuisines/italian'
    }

    const toJapanese = () => {
        window.location.href = '/cuisines/japanese'
    }

    const toKorean = () => {
        window.location.href = '/cuisines/korean'
    }

    const toMexican = () => {
        window.location.href = '/cuisines/mexican'
    }

    const toMoroccan = () => {
        window.location.href = '/cuisines/moroccan'
    }

    const toThai = () => {
        window.location.href = '/cuisines/thai'
    }

    const toVietnamese = () => {
        window.location.href = '/cuisines/vietnamese'
    }

    const toGlutenFree = () => {
        window.location.href = '/gluten-free'
    }

    const toVegetarian = () => {
        window.location.href = '/vegetarian'
    }

    const toDogSafe = () => {
        window.location.href = '/dog-safe'
    }

    return(
        <>
        
        <main>
            {recipes ? (
                <Container>
                    <HomeCarousel recipes={recipes} classes="home-carousel"/>
                    <Row className={'my-5'}>
                        <Col>
                        <h2>Recent Recipes</h2>
                        
                        <Row>
                            {recipes.slice(0, 8).map((recipe) => (
                                <Col key={recipe.id} sm={12} md={6} lg={3} xl={3} className = 'no-dec'>
                                    <Link to={`/recipes/${recipe.slug}`}>
                                    <Card className='my-3 p-3 rounded hover-cream'>
                                        <Card.Img src={recipe.image} variant='top' />
                                        <Card.Body>
                                            <Card.Title className = 'd-flex'>
                                                <strong>{recipe.name}</strong>
                                            </Card.Title>
                                            <Row className = 'd-flex justify-content-center align-content-center align-items-center'>
                                                <Col>
                                                    <StarRating rating={recipe.rating}/>
                                                </Col>
                                                <Col  className = 'flex-grow-0 flex-shrink-0'>
                                                <GFV recipe = {recipe}/>
                                                </Col>
                                            </Row>


                                        </Card.Body>
                                    </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                        <Button onClick = {() => toAll()} className = 'bg-red button-bg-red'><h6 className = 'my-0 py-0 '>See more</h6></Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Filter recipes</h2>
                            <Row>
                                <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title as = 'h4' className = 'my-3'>Meal</Card.Title>
                                        <hr/>
                                        <Card.Text>
                                        <Row className = 'd-flex gy-2' style = {{flexWrap:'wrap'}}>
                                            {breakfast && (<Col className = 'flex-grow-0'><Button onClick = {() => toBreakfast()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Breakfast</h6></Button></Col>)}
                                            {lunch && (<Col className = 'flex-grow-0'><Button onClick = {() => toLunch()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Lunch</h6></Button></Col>)}
                                            {dinner && (<Col className = 'flex-grow-0'><Button onClick = {() => toDinner()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Dinner</h6></Button></Col>)}
                                            {dessert && (<Col className = 'flex-grow-0'><Button onClick = {() => toDessert()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Dessert</h6></Button></Col>)}
                                            {snack && (<Col className = 'flex-grow-0'><Button onClick = {() => toSnacks()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Snack</h6></Button></Col>)}
                                            

                                        </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                </Col>
                                <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title as = 'h4' className = 'my-3'>Cuisine</Card.Title>
                                        <hr/>
                                        <Card.Text>
                                        <Row className = 'd-flex gy-2' style = {{flexWrap:'wrap'}}>
                                            {american  && (<Col className = 'flex-grow-0'><Button onClick = {() => toAmerican()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>American</h6></Button></Col>)}
                                            {brazilian  && (<Col className = 'flex-grow-0'><Button onClick = {() => toBrazilian()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Brazilian</h6></Button></Col>)}
                                            {chinese  && (<Col className = 'flex-grow-0'><Button onClick = {() => toChinese()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Chinese</h6></Button></Col>)}
                                            {english  && (<Col className = 'flex-grow-0'><Button onClick = {() => toEnglish()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>English</h6></Button></Col>)}
                                            {french  && (<Col className = 'flex-grow-0'><Button onClick = {() => toFrench()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>French</h6></Button></Col>)}
                                            {german  && (<Col className = 'flex-grow-0'><Button onClick = {() => toGerman()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>German</h6></Button></Col>)}
                                            {greek  && (<Col className = 'flex-grow-0'><Button onClick = {() => toGreek()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Greek</h6></Button></Col>)}
                                            {indian  && (<Col className = 'flex-grow-0'><Button onClick = {() => toIndian()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Indian</h6></Button></Col>)}
                                            {italian  && (<Col className = 'flex-grow-0'><Button onClick = {() => toItalian()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Italian</h6></Button></Col>)}
                                            {japanese  && (<Col className = 'flex-grow-0'><Button onClick = {() => toJapanese()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Japanese</h6></Button></Col>)}
                                            {korean  && (<Col className = 'flex-grow-0'><Button onClick = {() => toKorean()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Korean</h6></Button></Col>)}
                                            {mexican  && (<Col className = 'flex-grow-0'><Button onClick = {() => toMexican()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Mexican</h6></Button></Col>)}
                                            {moroccan  && (<Col className = 'flex-grow-0'><Button onClick = {() => toMoroccan()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Moroccan</h6></Button></Col>)}
                                            {thai  && (<Col className = 'flex-grow-0'><Button onClick = {() => toThai()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Thai</h6></Button></Col>)}
                                            {vietnamese  && (<Col className = 'flex-grow-0'><Button onClick = {() => toVietnamese()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Vietnamese</h6></Button></Col>)}
                                        </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                </Col>
                                <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title as = 'h4' className = 'my-3'>Restrictions</Card.Title>
                                        <hr/>
                                        <Card.Text>
                                        <Row className = 'd-flex gy-2' style = {{flexWrap:'wrap'}}>
                                            <Col className = 'flex-grow-1'><Button onClick = {() => toGlutenFree()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Gluten Free</h6></Button></Col>
                                            <Col className = 'flex-grow-1'><Button onClick = {() => toVegetarian()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Vegetarian</h6></Button></Col>
                                            <Col className = 'flex-grow-1'><Button onClick = {() => toDogSafe()} className = 'bg-d-blue button-bg-d-blue'><h6 className = 'py-0 my-0'>Dog Safe</h6></Button></Col>
                                        </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                </Container>

            ) : isLoading ? (
                <Loader/>
                //REPLACE
            ): (
                <Message variant='dark'>There has been an error; please refresh the page.</Message>
            )}
            
        </main>
        </>
    )
}

export default Home