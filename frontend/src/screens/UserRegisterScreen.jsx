import { useCreateUserMutation } from "../slices/usersApiSlice"
import React from "react"
import {toast } from "react-toastify"
import {Form, Button, Row, Col, Container, Card} from "react-bootstrap"
import PasswordStrengthBar from 'react-password-strength-bar'
import { useState } from "react"

const UserRegister = () => {
    const [createUser, { isLoading, isError, error }] = useCreateUserMutation()
    const [password, setPassword] = useState('')
    const [password_confirmation, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password == password_confirmation && password.length >= 8 && email.length > 4) {
        try {
            await createUser({ email, password, password_confirmation })
            toast.success("User created successfully")
        } catch (err) {
            toast.error(err.data?.message || err.error || err.data?.error?.message || "Something went wrong")
        }} else {
            toast.error("Invalid email or password")
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
                                <h1 className="mx-auto">Create Account</h1>
                            </Card.Title>
                            <Card.Subtitle style = {{display:'flex'}}  className="mx-auto">
                                Registered users can make comments and submit reviews 
                            </Card.Subtitle>
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
                                        <Col sm={4} lg ={3} style = {{marginTop:'-1rem'}}>
                                            <Form.Label>Password/confirm</Form.Label>
                                        </Col>
                                        <Col className = 'flex-grow-2'>
                                            <Row>
                                                <Col>
                                                <Form.Control id='password' type="password" onChange = {(e) => setPassword(e.target.value)} placeholder="" />
                                                </Col>
                                                <Col>
                                                <Form.Control id='confirmPassword' type="password" onChange = {(e) => setConfirmPassword(e.target.value)} placeholder="" />
                                                </Col>
                                            </Row>
                                            <PasswordStrengthBar password={password} />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Button variant="light" type="submit" className="mx-auto btn w-100" disabled={isLoading}>Sign Up</Button>
                            </Card.Body>
                        </Card>

                        </Col>
                    </Row>
                </Form>
            </Container>
        </main>
    )
}

export default UserRegister