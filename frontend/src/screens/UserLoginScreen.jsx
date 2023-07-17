import { useLoginUserMutation } from "../slices/usersApiSlice"
import React from "react"
import {toast } from "react-toastify"
import {Form, Button, Row, Col, Container, Card} from "react-bootstrap"
import PasswordStrengthBar from 'react-password-strength-bar'
import { useState, useContext } from "react"
import {useHistory} from "react-router-dom"
import { set } from "mongoose"
import { AuthContext } from "../utils/authContext"
import { Link } from "react-router-dom"

const UserLogin = () => {
    const [loginUser, { isLoading, isError, error }] = useLoginUserMutation()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [state, setState] = useContext(AuthContext)

    const history = useHistory()

    if(sessionStorage.getItem('token')){
        history.push('/user')
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try{
        loginUser({ email, password }).unwrap().then((response) => {
            if (response.originalStatus !=401){
            setState(state => ({ ...state, token: response.auth }))
            sessionStorage.setItem('token', response.auth)
            toast.success('Login successful')
            history.push('/')
            window.location.reload()
        } else {
                toast.error('Invalid email or password')
            }
        }).catch(e => {
                if (! toast.isActive('error')){
                toast.error('Invalid email or password', {toastId: 'error'})}
            })
        } catch(e){
                if (! toast.isActive('error')){
                toast.error('Invalid email or password', {toastId: 'error'})}
            }
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
                        <Link to = '/register'>Don't have an account? Register here</Link>
                        </Col>
                    </Row>
                    
                </Form>
            </Container>
        </main>
    )
}

export default UserLogin