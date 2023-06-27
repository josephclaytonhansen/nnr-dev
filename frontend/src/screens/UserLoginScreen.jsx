import { useLoginUserMutation } from "../slices/usersApiSlice"
import React from "react"
import {toast } from "react-toastify"
import {Form, Button, Row, Col, Container, Card} from "react-bootstrap"
import PasswordStrengthBar from 'react-password-strength-bar'
import { useState, useContext } from "react"
import {useHistory} from "react-router-dom"
import {UserContext } from "../context/userContext"
import { BASE_URL } from '../constants'

const UserLogin = () => {
    const [loginUser, { isLoading, isError, error }] = useLoginUserMutation()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [userContext, setUserContext] = useContext(UserContext)
    

    const history = useHistory()

    const submitHandler = async (e) => {
        e.preventDefault()

        fetch(BASE_URL + "/api/users/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ username: email, password }),
          })
            .then(async response => {

              if (!response.ok) {
                if (response.status === 400) {
                  toast.error("Please fill all the fields correctly!")
                } else if (response.status === 401) {
                  toast.error("Invalid email and password combination.")
                } else {
                  toast.error("Something went wrong")
                }
              } else {
                const data = await response.json()
                setUserContext(oldValues => {
                  return { ...oldValues, token: data.token }
                })
              }
            })
            .catch(error => {
              toast.error("Something went wrong")
            })
        }
        
            
    

    return(
        <main>
            <Container>
                <Form onSubmit={submitHandler}>
                    <Row className = 'd-flex justify-content-center align-content-center align-items-center'>
                        <Col md = {6} xs = {12}>
                        <Card className="p-3 d-flex">
                            <Card.Title style = {{display:'flex'}}>
                                <h1 className="mx-auto">Login</h1>
                            </Card.Title>
                            <Card.Body>
                                <Form.Group controlId="email">
                                    <Row className = 'd-flex align-items-center my-3'>
                                        <Col sm={2} lg ={1} className="mt-2">
                                            <Form.Label >Email</Form.Label>
                                        </Col>
                                        <Col className = 'flex-grow-2'>
                                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row className = 'd-flex align-items-center my-3'>
                                        <Col sm={3} lg ={2} style = {{marginTop:'-1rem'}}>
                                            <Form.Label>Password</Form.Label>
                                        </Col>
                                        <Col className = 'flex-grow-2'>
                                            <Row>
                                                <Col>
                                                <Form.Control id='password' type="password" onChange = {(e) => setPassword(e.target.value)} placeholder="" />
                                                </Col>
                                                
                                            </Row>

                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Button variant="light" type="submit" className="mx-auto btn w-100" disabled={isLoading}>Sign In</Button>
                            </Card.Body>
                        </Card>

                        </Col>
                    </Row>
                </Form>
            </Container>
        </main>
    )
}

export default UserLogin