import React from 'react'
import { Link } from 'react-router-dom'
import {ListGroup, Row, Col, InputGroup, Form, Container, Badge} from 'react-bootstrap'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog, faBan, faSeedling, faAppleAlt, faWheatAlt } from '@fortawesome/free-solid-svg-icons'


const GFV = () => {
    const recipe = JSON.parse(sessionStorage.getItem("recipe"))
    const isGlutenFree = recipe.isGlutenFree
    const isVegetarian = recipe.isVegetarian
    const isDogSafe = recipe.dogSafe

    


    return(
        <Row>
            <Col className = 'd-flex justify-content-start' style = {{gap:'2.5rem'}}>
                {isGlutenFree ? (
                    <span className='fa-layers fa-fw'>
                    <FontAwesomeIcon icon ={faWheatAlt} transform="shrink-2" color={'#1A5276'} fontSize = {'3rem'}/>
                    </span>
                ) : (
                    <span className='fa-layers fa-fw'>
                    <FontAwesomeIcon icon ={faWheatAlt} transform="shrink-8" fontSize = {'3rem'} color = {'#1A5276'}/>
                    <FontAwesomeIcon icon ={faBan} fontSize = {'3rem'} color={'tomato'}/>
                    </span>
                )}
                {isVegetarian ? (
                    <span className='fa-layers fa-fw'>
                    <FontAwesomeIcon icon ={faSeedling} transform="shrink-2" color={'#1A5276'} fontSize = {'3rem'}/>
                    </span>
                ) : (
                    <span className='fa-layers fa-fw'>
                    <FontAwesomeIcon icon ={faSeedling} transform="shrink-7 right-.5" fontSize = {'3rem'} color = {'#1A5276'}/>
                    <FontAwesomeIcon icon ={faBan} fontSize = {'3rem'} color={'tomato'}/>
                    </span>
                )}
                {isDogSafe ? (
                    <span className='fa-layers fa-fw'>
                    <FontAwesomeIcon icon ={faDog} transform="shrink-2" color={'#1A5276'} fontSize = {'3rem'}/>
                    </span>
                ) : (
                    <span className='fa-layers fa-fw'>
                    <FontAwesomeIcon icon ={faDog} transform="shrink-8 left-1" fontSize = {'3rem'} color = {'#1A5276'}/>
                    <FontAwesomeIcon icon ={faBan} fontSize = {'3rem'} color={'tomato'}/>
                    </span>
                )}

            </Col>
        </Row>
    )

}

export default GFV