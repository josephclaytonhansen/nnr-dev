import React from 'react'
import { Link } from 'react-router-dom'
import {ListGroup, Row, Col, InputGroup, Form, Container} from 'react-bootstrap'
import {} from 'react-icons/fa'
import { useState } from 'react'
import fractionFormatter from '../utils/fractionFormatter'
import '../css/Recipe.css'

const Ingredients = () => {
    const recipe = JSON.parse(sessionStorage.getItem("recipe"))
    const [feeds, setServings] = useState(recipe.feeds)

    return (
        <Container>
        <Row>
            <Col sm = {12}> 
            <Form>
                <Form.Group controlId="feeds">
                    <Row>
                        <Col lg = {5} md = {5} sm = {4}><Form.Label><h4>Servings</h4></Form.Label></Col>
                        <Col lg = {5} md = {4} sm = {4}>
                            <Form.Control type="number"value={feeds} onChange={(e) => setServings(Number(e.target.value))} min={1}></Form.Control>
                        </Col>
                        <Col lg = {2} md = {3} sm = {4}>
                            <Form.Control type = "button" value = "Reset" class-name = "btn" style={{backgroundColor:'var(--light-blue)', color: 'white', fontWeight: 600}} onClick = {() => setServings(recipe.feeds)}></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
            </Col>
            <Col sm = {12}>
            <h3>Ingredients</h3>
                <ListGroup variant="flush">
                    {recipe.ingredients.map((ingredient) => (
                        
                        <ListGroup.Item key={ingredient.name}>
                            {fractionFormatter(ingredient.amount * (feeds/recipe.feeds))} {!ingredient.unit ==="single" && ingredient.unit}{ingredient.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </Row>
        </Container>
    )
}

export default Ingredients