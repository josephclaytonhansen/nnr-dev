import React from "react"
import {Row, Col, Container} from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import "../css/Recipe.css"
import { useState } from "react"


const Footer = () => {
    let hover = false
    const toggleHover = () => {
        hover = !hover
        if (hover) {
            handleHover()
        } else {
            noHover()
        }
    }
    const handleHover = () => {
            document.getElementById('footer-hover-row').style.maxHeight = '1000px'
            document.getElementById('footer-arrow').style.transform = 'rotate(180deg)'
            document.getElementById('footer-arrow').style.opacity = '0'
}
    const noHover = () => {
        document.getElementById('footer-hover-row').style.maxHeight = '20px'
        document.getElementById('footer-arrow').style.transform = 'rotate(0deg)'
        document.getElementById('footer-arrow').style.opacity = '1'
    }
    return(
        <footer className = 'fixed-bottom bg-d-gray'>
            
            <Container onMouseOver={handleHover} onMouseLeave={noHover} onClick={toggleHover}>
            
                <Row id='footer-hover-row' style={{maxHeight:'20px'}}>
                <FontAwesomeIcon id={'footer-arrow'} icon={faArrowUp} className="text-center py-1" style={{fontSize:'14px'}}/>
                    <Col className="text-center py-3">
                        <Link to="/why">Why?</Link>
                    </Col>
                    <Col className="text-center py-3">
                        <Link to="/contribute">Contribute recipes</Link>
                    </Col>
                    <Col className="text-center py-3">
                        <Link to="/contact">Contact</Link>
                    </Col>
                    <Col className="text-center py-3">
                        <strong>Copyright 2023 Joseph Hansen</strong>
                    </Col>
                    



                </Row>
            </Container>
        </footer>
    )
}

export default Footer