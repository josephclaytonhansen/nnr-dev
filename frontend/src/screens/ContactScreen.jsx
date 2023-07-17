import React from "react"
import {Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import 'balloon-css'
import '../css/Recipe.css'
import { BASE_URL } from "../constants"

const Contact = () => {
    return(
        <main>
            <Container>
                <Row>
                    <Col>
                        <h1 className="mb-5">Contact me?</h1>
                        <p>Please don't, there's very few reasons why you should. (Exceptions mainly being if you want to work with me on something, then go wild!)</p>
                        <p>If you must, you can find my email on the <Link to= {`/why`}>/why</Link> page :) </p>
                    </Col>
                </Row>
                </Container>
        </main>
    )
}

export default Contact