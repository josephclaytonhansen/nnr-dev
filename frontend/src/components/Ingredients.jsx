import React from 'react'
import { Link } from 'react-router-dom'
import {ListGroup, Row, Col, InputGroup, Form, Container} from 'react-bootstrap'
import {} from 'react-icons/fa'
import { useState } from 'react'

const Ingredients = () => {
    const recipe = JSON.parse(sessionStorage.getItem("recipe"))
    const [feeds, setServings] = useState(recipe.feeds)

    return (
        <Container>
        <Row>
            <Col>
            <Form>
                <Form.Group controlId="feeds">
                    <Row>
                        <Col sm = {5}><Form.Label><h4>Servings</h4></Form.Label></Col>
                        <Col sm = {5}>
                            <Form.Control type="number"value={feeds} onChange={(e) => setServings(Number(e.target.value))} min={1}></Form.Control>
                        </Col>
                        <Col sm = {2}>
                            <Form.Control type = "button" value = "Reset" class-name = "btn" onClick = {() => setServings(recipe.feeds)}></Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
            </Col>
        </Row>
        <Row>
            <Col>
            <h3>Ingredients</h3>
                <ListGroup variant="flush">
                    {recipe.ingredients.map((ingredient) => (
                        
                        <ListGroup.Item key={ingredient.name}>
                            {ingredient.amount * (feeds/recipe.feeds)} {!ingredient.unit ==="single" && ingredient.unit}{ingredient.name}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </Row>
        </Container>
    )
}

export default Ingredients