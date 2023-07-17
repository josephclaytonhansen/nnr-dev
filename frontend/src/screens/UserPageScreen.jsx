import React from "react"
import {Row, Col, Container, ListGroup, Form, FormControl, FormGroup, Card, Button} from "react-bootstrap"
import jwt from 'jwt-decode'
import { toast } from 'react-toastify'
import { BASE_URL } from '../constants'
import { useState } from 'react'
import Permissions from '../utils/Permissions'
import { useUpdateUserMutation } from "../slices/usersApiSlice"
import PasswordStrengthBar from 'react-password-strength-bar'
import { useHistory } from "react-router-dom"

const UserPageScreen = () => {
    const history = useHistory()
    let complete = false
    let auth = sessionStorage.getItem('token')
    let [user, setUser] = useState('none')
    let [token, setToken] = useState('none')
    let [displayName, setDisplayName] = useState('none')
    let [password, setPassword] = useState('')
    let permissions = Permissions(auth, user, setUser, setToken, complete, jwt, BASE_URL, toast)
    const [updateUser, {isLoading: loadingUpdateUser}] = useUpdateUserMutation()
    const id = permissions[0]
    if (displayName === 'none') {
    fetch(`${BASE_URL}/api/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => res.json())
    .then((responseJSON) => {
        setDisplayName(responseJSON[0])
    })}

    const submitHandler = async() => {
        try {
            const res = await updateUser({userId: id, updatedUser: {displayName: displayName, password: password}}).unwrap()
            toast.success("User updated. Please log in again")
        } catch(err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    const setDisplayNameHandler = (e) => {
        setDisplayName(e.target.value)
    }

    const setPasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const logOutHandler = () => {
        sessionStorage.removeItem('token')
        setUser('none')
        setToken('none')
        toast.success("Logged out")
        history.push('/')
    }

    const anonymizeAccountHandler = async() => {
        try {
            const res = await updateUser({userId: id, updatedUser: {displayName: `anon${Math.floor(Math.floor(Math.random()*1000)*(Math.random()*1000))}`, password: `anon${Math.floor(Math.floor(Math.random()*1000)*(Math.random()*1000))}`}, email: `anon${Math.floor(Math.floor(Math.random()*1000)*(Math.random()*1000))}`}).unwrap()
            toast.success("User anonymized.")
            history.push('/')
        } catch(err) {
            toast.error(err?.data?.message || err.error)
        }
    }



    return(
        <main>
            {permissions && (<Container>
                
                <Row >
                    <Col>
                    <h1>User profile</h1>
                    <hr className="py-3"/>
                    <Card className="p-3">
                    <Row >
                        <Col md = {3}>
                        <Form.Label><h3>Display name</h3></Form.Label>
                        </Col>
                        <Col>
                        <Form>
                            <Form.Group>
                                
                                <Form.Control type="text" value={displayName} onChange={setDisplayNameHandler} />
                            </Form.Group>
                        </Form>
                        </Col>
                    </Row>
                    <Row >
                        <Col md = {3}>
                        <Form.Label><h3>Change password</h3></Form.Label>
                        </Col>
                        <Col>
                        <Form>
                            <Form.Group>
                                <Form.Control type="password" value={password} onChange = {setPasswordHandler}/>
                                <PasswordStrengthBar password={password} minLength={8}/>
                            </Form.Group>
                            <Button className = {`my-2`} onClick={submitHandler}>Submit</Button>
                        </Form>
                        </Col>
                    </Row>
                    </Card>
                    
                    </Col>

                    <Row className = {`my-2`}> 
                        <Col>
                        <Button className = {'my-2 bg-blue button-bg-blue'} onClick = {logOutHandler}>Log Out</Button>
                        </Col>
                    </Row>
                    <Row className = {'my-5'}>
                        <Col>
                        <Button className = {'my-2 bg-red button-bg-red'} onClick = {anonymizeAccountHandler}>Anonymize account</Button>
                        </Col>
                        <Col style = {{flexGrow:6}}>
                        <p>This will randomize your username, email, password, and display name. Existing comments will remain on the site. This is permanent, in accordance with applicable right-to-be-forgotten laws, and covers the appropiate scope of personally identifying information.</p>
</Col>
                    </Row>
                </Row>
            </Container>)}
            
        </main>
    )
}

export default UserPageScreen