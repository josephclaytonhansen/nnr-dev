import React from "react"
import {Container, Row, Col, Button, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import 'balloon-css'
import '../css/Recipe.css'
import jwt from 'jwt-decode'
import { toast } from 'react-toastify'
import { BASE_URL } from '../constants'
import { useState } from 'react'
import Permissions from '../utils/Permissions'

const Contribute = () => {
    let complete = false
    let auth = sessionStorage.getItem('token')
    let [user, setUser] = useState('none')
    let [token, setToken] = useState('none')

    let permissions = Permissions(auth, user, setUser, setToken, complete, jwt, BASE_URL, toast)
    console.log(permissions)

    const requestHandler = () => {
        fetch(`${BASE_URL}/api/users/request-authorship/${permissions[0]}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then((res) => res.json(toast.success("Request sent!")))
        .then((responseJSON) => {
            toast.error(responseJSON.message)
        })
    }

    return(
        <main>
            <Container>
            <h1>Want to add recipes?</h1>
                        <h3 className="mb-5">Here's how:</h3>
                <Row className="align-items-center my-1">
                    <Col >
                    <p className = 'lead fs-1'>1</p>
                    </Col>
                    <Col style = {{flexGrow:16}}>
                        
                        <ListGroup as={`ol`} className = {'my-1'}>
                            <ListGroup.Item as={`li`}><h4>Create an account</h4> <p>Click the user icon in the header, register, and login</p></ListGroup.Item>

                        </ListGroup>
                    </Col>
                </Row>
                <Row className="align-items-center my-1">
                    <Col >
                    <p className = 'lead fs-1'>2</p>
                    </Col>
                    <Col style = {{flexGrow:16}}>
                        
                        <ListGroup as={`ol`} className = {'my-1'}>
                            <ListGroup.Item as={`li`}><h4>Make comments</h4> <p>Only accounts with a helpful comment history will be considered!</p></ListGroup.Item>

                        </ListGroup>
                    </Col>
                </Row>
                <Row className="align-items-center my-1">
                    <Col >
                    <p className = 'lead fs-1'>3</p>
                    </Col>
                    <Col style = {{flexGrow:16}}>
                        
                        <ListGroup as={`ol`} className = {'my-1'}>
                            <ListGroup.Item as={`li`}><h4>Click this button to request authorship status</h4>
                            <Button className = {'my-2 bg-red button-bg-red'} onClick = {requestHandler}>Request authorship</Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>
                </Row>
                </Container>
                </main>
    )
}

export default Contribute