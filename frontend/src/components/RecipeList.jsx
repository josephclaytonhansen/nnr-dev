import { Container, Row, Col, ListGroup, Button } from "react-bootstrap"
import React from "react"
import GFV from "./GFV"
import Tags from "./Tags"
import StarRating from "../components/StarRating"
import dayjs from "dayjs"

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
                            <Row className = 'align-items-center'>
                                <Col md={3}>
                                    <strong style={{fontSize: `130%`}}>{recipe.name}</strong>
                                </Col>
                                <Col md={1}>
                                    <GFV recipe={recipe} fontSize='1.6rem'/>
                                </Col>
                                {recipe.numReviews > 0 ? (<Col md={2}>
                                    <StarRating rating={recipe.rating} text={`${recipe.numReviews} reviews`} />
                                </Col>) : (
                                    <Col md={2} style = {{textAlign:'center'}}>
                                        <span>No reviews</span>
                                    </Col>
                                )}
                                <Col md={4}>
                                    <Tags tags={recipe.tags}/>
                                </Col>
                                <Col md={2}>
                                    {`Ready at ${now.add(recipe.timeToMake, 'minute').format('h:mm a')}`}
                                </Col>
                                
                            </Row>
                        </ListGroup.Item>

                    ))}
                </ListGroup>
            </Row>
        )}
        </>
    )
}

export default RecipeList