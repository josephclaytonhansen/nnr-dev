import React from 'react'
import { Link } from 'react-router-dom'
import {ListGroup, Row, Col, InputGroup, Form, Container, Badge} from 'react-bootstrap'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog, faBan, faSeedling, faAppleAlt, faWheatAlt } from '@fortawesome/free-solid-svg-icons'
import 'balloon-css'
import '../css/Recipe.css'


const GFV = ({fontSize}) => {
    const recipe = JSON.parse(sessionStorage.getItem("recipe"))
    const isGlutenFree = recipe.isGlutenFree
    const isVegetarian = recipe.isVegetarian
    const isDogSafe = recipe.dogSafe

    return(
        <>
        {recipe &&(
            <>
            <Row className = 'display-desktop'> 
            <Col className = 'd-flex justify-content-start' style = {{gap:fontSize}}>
                {isGlutenFree ? (
                    <span className='fa-layers fa-fw balloon-tooltip' aria-label="Gluten free" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faWheatAlt} transform="shrink-2" className = {'icon-dark-blue'} fontSize = {fontSize}/>
                    </span>
                ) : (
                    <span className='fa-layers fa-fw balloon-tooltip-danger' aria-label="Not gluten free" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faWheatAlt} transform="shrink-8" fontSize = {fontSize} color = {'#1A5276'}/>
                    <FontAwesomeIcon icon ={faBan} fontSize = {fontSize} className = {'icon-red'}/>
                    </span>
                )}
                {isVegetarian ? (
                    <span className='fa-layers fa-fw balloon-tooltip' aria-label="Vegetarian" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faSeedling} transform="shrink-2" className = {'icon-dark-blue'} fontSize = {fontSize}/>
                    </span>
                ) : (
                    <span className='fa-layers fa-fw  balloon-tooltip-danger' aria-label="Not vegetarian" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faSeedling} transform="shrink-7 left-.25 down-.25" fontSize = {fontSize} color = {'#1A5276'}/>
                    <FontAwesomeIcon icon ={faBan} fontSize = {fontSize} className = {'icon-red'}/>
                    </span>
                )}
                {isDogSafe ? (
                    <span className='fa-layers fa-fw balloon-tooltip' aria-label="Safe for dogs" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faDog} transform="shrink-2" className = {'icon-dark-blue'} fontSize = {fontSize}/>
                    </span>
                ) : (
                    <span className='fa-layers fa-fw  balloon-tooltip-danger' aria-label="Unsafe for dogs" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faDog} transform="shrink-8 left-1" fontSize = {fontSize} color = {'#1A5276'}/>
                    <FontAwesomeIcon icon ={faBan} fontSize = {fontSize} className = {'icon-red'}/>
                    </span>
                )}

            </Col>
        </Row>
        <Row className = 'display-mobile justify-content-end badges-mobile'>
                    {isGlutenFree && (<Col sm={4}><div className = 'bg-d-blue custom-badge' variant = 'light'>Gluten free</div></Col>)}
                    {!isGlutenFree && (<Col sm={4}><div className = 'bg-red custom-badge'>Not gluten free</div></Col>)}
                    {isVegetarian && (<Col sm={4}><div className = 'bg-d-blue custom-badge'>Vegetarian</div></Col>)}
                    {!isVegetarian && (<Col sm={4}><div className = 'bg-red custom-badge'>Not vegetarian</div></Col>)}
                    {isDogSafe && (<Col sm={4}><div className = 'bg-d-blue custom-badge'>Safe for dogs</div></Col>)}
                    {!isDogSafe && (<Col sm={4}><div className = 'bg-red custom-badge'>Unsafe for dogs</div></Col>)}
        </Row>
        </>
        )}
        
        </>
    )

}

export default GFV