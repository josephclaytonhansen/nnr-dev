import { Link } from 'react-router-dom'
import {ListGroup, Row, Col, InputGroup, Form, Container, Badge, FormGroup, FormControl, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-solid-svg-icons'
import 'balloon-css'
import GFV from '../GFV'
import { useState } from 'react'

const Internal = ({recipe, submit, deleteF}) => {

    const updateName = (name) => {
        recipe.name = name
    }
    const updateTimeToMake = (timeToMake) => {
        recipe.timeToMake = timeToMake
    }

    const [glutenFree, setGlutenFree] = useState(recipe.isGlutenFree)
    const [vegetarian, setVegetarian] = useState(recipe.isVegetarian)
    const [dogSafe, setDogSafe] = useState(recipe.dogSafe)

    const toggle = (what) => {
        if (what === 'gluten free' || what === 'not gluten free'){
            setGlutenFree(!glutenFree)
            recipe.isGlutenFree = glutenFree
        } else if (what === 'vegetarian' || what === 'not vegetarian'){
            setVegetarian(!vegetarian)
            recipe.isVegetarian = vegetarian
        } else if (what === 'safe for dogs' || what === 'not safe for dogs'){
            setDogSafe(!dogSafe)
            recipe.dogSafe = dogSafe
        }
    }

    return(
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={submit}>
                        <Row>
                            <Col lg = {5} sm = {12}>
                                <Form.Group controlId='name'>
                                    <Row className = "justify-content-center align-content-center align-items-center">
                                        <Col lg = {2} md = {4}>
                                        <Form.Label className = 'm-0'><strong>Name</strong></Form.Label>
                                        </Col>
                                        <Col lg = {10} md = {8}>
                                        <Form.Control type='text' placeholder='Enter name' value={recipe.name} onChange={(e) => updateName(e.target.value)}></Form.Control>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col lg = {4} sm = {12}>
                                <Form.Group controlId='timeToCook'>
                                    <Row className = "justify-content-center align-content-center align-items-center">
                                        <Col lg = {5} md = {4}>
                                        <Form.Label className = 'm-0'><strong>Time to Make</strong></Form.Label>
                                        </Col>
                                        <Col lg = {7} md = {8}>
                                        <Form.Control type='number' value={recipe.timeToMake} onChange={(e) => updateTimeToMake(e.target.value)}></Form.Control>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col lg = {3} sm = {12}>
                                <GFV fontSize='2rem' recipe={recipe} style={{marginTop:'.5rem'}}  onClicks={toggle} onClicksUse={true}/>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Internal