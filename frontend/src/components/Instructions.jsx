import React from 'react'
import { Link } from 'react-router-dom'
import {ListGroup, Row, Col, InputGroup, Form, Container,} from 'react-bootstrap'
import {} from 'react-icons/fa'
import { useState } from 'react'

const Ingredients = () => {
    const recipe = JSON.parse(sessionStorage.getItem("recipe"))
    const [feeds, setServings] = useState(recipe.feeds)

    return (
        <Container>
        <Row  className="my-3">
            <Col>
            <h3>Instructions</h3>
                {recipe.instructions.map((instructions, index) => (
                    <Row className='align-items-center my-3' >
                        <Col style = {{maxWidth:'1rem'}}>
                            <h4>{index  + 1}</h4>
                        </Col>
                        <Col>
                        <ListGroup variant = 'flush'>
                    <ListGroup.Item key={instructions.name}>
                        {instructions.name && (<><strong>{instructions.name}</strong><br/></>)}
                        {instructions.details}
                    </ListGroup.Item>
                    </ListGroup>
                    </Col>
                    </Row>
                ))}
            </Col>
        </Row>
        </Container>
    )
}

export default Ingredients