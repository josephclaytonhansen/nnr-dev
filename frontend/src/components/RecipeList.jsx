import { Container, Row, Col, ListGroup, Button } from "react-bootstrap"
import React from "react"
import GFV from "./GFV"
import Tags from "./Tags"
import StarRating from "../components/StarRating"
import dayjs from "dayjs"
import { Link } from "react-router-dom"

const RecipeList = () => {
    const recipes = JSON.parse(sessionStorage.getItem("recipes"))
    var now = dayjs()
    return(
        <>
        {recipes && (
            <Row>
                <ListGroup variant='flush'>
                    {recipes.map((recipe) => (
                        <ListGroup.Item key={recipe.id}>
                            <Link to = {`/recipes/${recipe.slug}`} className = "recipe-row-link">
                            <Row className = 'align-items-center'>
                                <Col lg = {3} md={4} sm = {12}>
                                    <strong style={{fontSize: `130%`}}><p>{recipe.name}<span className='display-mobile' style = {{display:'inline!important'}}> - Ready at {now.add(recipe.timeToMake, 'minute').format('h:mm a')}</span></p></strong>
                                </Col>
                                <Col lg = {1} md={8} sm={12}>
                                    <GFV recipe={recipe} fontSize='1.6rem'/>
                                </Col>
                                {recipe.numReviews > 0 ? (<Col md={2} className = 'display-desktop justify-content-center'>
                                    <StarRating rating={recipe.rating} text={`${recipe.numReviews}`} />
                                </Col>) : (
                                    <Col md={2} style = {{textAlign:'center'}}  className = 'display-desktop justify-content-center'>
                                        <span>No reviews</span>
                                    </Col>
                                )}
                                <Col md={4} sm={12} className = 'display-desktop'>
                                    <Tags tags={recipe.tags}/>
                                </Col>
                                <Col md={2} className='display-desktop balloon-tooltip' aria-label={`Takes ${recipe.timeToMake} minutes to make`} data-balloon-pos={'right'}>
                                    {`Ready at ${now.add(recipe.timeToMake, 'minute').format('h:mm a')}`}
                                </Col>
                                
                            </Row>
                            </Link>
                        </ListGroup.Item>

                    ))}
                </ListGroup>
            </Row>
        )}
        </>
    )
}

export default RecipeList