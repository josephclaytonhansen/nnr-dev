import React from 'react'
import { Link } from 'react-router-dom'
import {ListGroup, Row, Col, InputGroup, Form, Container, Button} from 'react-bootstrap'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
                    <Row  className="my-3">
                        <Col lg = {7} md = {5} sm = {4}><Form.Label><h4>Servings</h4></Form.Label></Col>
                        <Col lg = {3} md = {4} sm = {4}>
                            <Form.Control type="number"value={feeds} onChange={(e) => setServings(Number(e.target.value))} min={1}></Form.Control>
                        </Col>
                        <Col lg = {2} md = {3} sm = {4}>
                            <Button variant='light' className='btn' onClick = {() => setServings(recipe.feeds)}><FontAwesomeIcon icon={faRotateLeft}/></Button>
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