import React from 'react'
import { Link } from 'react-router-dom'
import {ListGroup, Row, Col, InputGroup, Form, Container, Badge, Button} from 'react-bootstrap'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDog, faBan, faSeedling, faAppleAlt, faWheatAwnCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import 'balloon-css'
import '../css/Recipe.css'

const GFV = (props) => {
    const fontSize = props.fontSize
    const recipe = props.recipe
    const style = props.style
    const onClicks = props.onClicks || null
    const onClicksUse = props.onClicksUse || false
    
    if (!recipe) {
        const recipe = JSON.parse(sessionStorage.getItem("recipe"))
        if (!recipe){
            return null
        }
    }

    const toggleOnClick = (e) => {
        if (onClicksUse){
        e.preventDefault()
        const target = e.target.id
        onClicks(target)
        
        }


    }

    const isGlutenFree = recipe.isGlutenFree || false
    const isVegetarian = recipe.isVegetarian || false
    const isDogSafe = recipe.dogSafe || false

    if (onClicksUse){
        return(
            <>
            <Row className = ''> 
            <Col className = 'd-flex justify-content-start' style = {{gap:fontSize}}>
            {isGlutenFree ? (
               <Button width={fontSize} height={fontSize} id='gluten free' variant = 'light' onClick={toggleOnClick}>
               <span className='fa-layers fa-fw balloon-tooltip' aria-label="Gluten free" data-balloon-pos="down">
               <FontAwesomeIcon  icon ={faWheatAwnCircleExclamation} transform="shrink-2" className = {'icon-dark-blue'} fontSize = {fontSize} />
               </span>
               </Button> 
            ) : (
                <Button width={fontSize} height={fontSize} id='gluten free' variant = 'light' onClick={toggleOnClick}>
                    <span className='fa-layers fa-fw balloon-tooltip-danger' aria-label="Not gluten free" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faWheatAwnCircleExclamation} transform="shrink-7 left-2" fontSize = {fontSize} className = {'icon-dark-blue'} />
                    <FontAwesomeIcon icon ={faBan} fontSize = {fontSize} className = {'icon-red'} />
                    </span>
                    </Button>
            )}
            {isVegetarian ? (
               <Button width={fontSize} height={fontSize} id='vegetarian' variant = 'light' onClick={toggleOnClick}>
               <span className='fa-layers fa-fw balloon-tooltip' aria-label="Vegetarian" data-balloon-pos="down">
               <FontAwesomeIcon  icon ={faSeedling} transform="shrink-2" className = {'icon-dark-blue'} fontSize = {fontSize} />
               </span>
               </Button> 
            ) : (
                <Button width={fontSize} height={fontSize} id='not vegetarian' variant = 'light' onClick={toggleOnClick}>
                    <span className='fa-layers fa-fw balloon-tooltip-danger' aria-label="Not vegetarian" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faSeedling} transform="shrink-8" fontSize = {fontSize} className = {'icon-dark-blue'} />
                    <FontAwesomeIcon icon ={faBan} fontSize = {fontSize} className = {'icon-red'} />
                    </span>
                    </Button>
            )}
            {isDogSafe ? (
                <Button width={fontSize} height={fontSize} id='safe for dogs' variant = 'light' onClick={toggleOnClick}>
                <span className='fa-layers fa-fw balloon-tooltip' aria-label="Safe for dogs" data-balloon-pos="down">
                <FontAwesomeIcon  icon ={faDog} transform="shrink-2" className = {'icon-dark-blue'} fontSize = {fontSize} />
                </span>
                </Button>
            ) : (
                <Button width={fontSize} height={fontSize} id='not safe for dogs' variant = 'light' onClick={toggleOnClick}>
                    <span className='fa-layers fa-fw balloon-tooltip-danger' aria-label="Not safe for dogs" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faDog} transform="shrink-8" fontSize = {fontSize} className = {'icon-dark-blue'} />
                    <FontAwesomeIcon icon ={faBan} fontSize = {fontSize} className = {'icon-red'} />
                    </span>
                    </Button>
            )}
            </Col>
            </Row>

            </>

        )
    }
    else {
        return(
            <>
            <Row className = 'display-desktop'> 
            <Col className = 'd-flex justify-content-start' style = {{gap:fontSize}}>
            {isGlutenFree ? (

               <span className='fa-layers fa-fw balloon-tooltip' aria-label="Gluten free" data-balloon-pos="down">
               <FontAwesomeIcon  icon ={faWheatAwnCircleExclamation} transform="shrink-2" className = {'icon-dark-blue'} fontSize = {fontSize} />
               </span>
 
            ) : (

                    <span className='fa-layers fa-fw balloon-tooltip-danger' aria-label="Not gluten free" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faWheatAwnCircleExclamation} transform="shrink-7 left-2" fontSize = {fontSize} className = {'icon-dark-blue'} />
                    <FontAwesomeIcon id="not gluten free" icon ={faBan} fontSize = {fontSize} className = {'icon-red'} />
                    </span>

            )}
            {isVegetarian ? (

               <span className='fa-layers fa-fw balloon-tooltip' aria-label="Vegetarian" data-balloon-pos="down">
               <FontAwesomeIcon  icon ={faSeedling} transform="shrink-2" className = {'icon-dark-blue'} fontSize = {fontSize} />
               </span>
 
            ) : (

                    <span className='fa-layers fa-fw balloon-tooltip-danger' aria-label="Not vegetarian" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faSeedling} transform="shrink-8" fontSize = {fontSize} className = {'icon-dark-blue'} />
                    <FontAwesomeIcon id="not vegetarian" icon ={faBan} fontSize = {fontSize} className = {'icon-red'} />
                    </span>

            )}
            {isDogSafe ? (

                <span className='fa-layers fa-fw balloon-tooltip' aria-label="Safe for dogs" data-balloon-pos="down">
                <FontAwesomeIcon  icon ={faDog} transform="shrink-2" className = {'icon-dark-blue'} fontSize = {fontSize} />
                </span>

            ) : (

                    <span className='fa-layers fa-fw balloon-tooltip-danger' aria-label="Not safe for dogs" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faDog} transform="shrink-8" fontSize = {fontSize} className = {'icon-dark-blue'} />
                    <FontAwesomeIcon id="not safe for dogs" icon ={faBan} fontSize = {fontSize} className = {'icon-red'} />
                    </span>

            )}
            </Col>
            </Row>
            <Row className = 'display-mobile me-auto justify-content-start align-items-center align-content-center gx-5' style={{marginTop: '1rem'}}>
            <Col style = {{width:'2.1rem'}}  className='flex-shrink-0 flex-grow-0'>
            {isGlutenFree ? (
                <FontAwesomeIcon  icon ={faWheatAwnCircleExclamation} transform="shrink-2" className = {'icon-dark-blue'} fontSize = {'2rem'} />
            ) : (
                <span className='fa-layers fa-fw balloon-tooltip-danger' aria-label="Not gluten free" data-balloon-pos="down">
                <FontAwesomeIcon icon ={faWheatAwnCircleExclamation} transform="shrink-7 left-2" fontSize = {'2rem'} className = {'icon-dark-blue'} />
                <FontAwesomeIcon id="not gluten free" icon ={faBan} fontSize = {'2rem'} className = {'icon-red'} />
                </span>
            )}
            </Col>
            <Col style = {{width:'2.1rem'}} className='flex-shrink-0 flex-grow-0'>

            {isVegetarian ? (
                <FontAwesomeIcon  icon ={faSeedling} transform="shrink-2" className = {'icon-dark-blue'} fontSize = {'2rem'} />
            ) : (
                <span className='fa-layers fa-fw balloon-tooltip-danger' aria-label="Not vegetarian" data-balloon-pos="down">
                <FontAwesomeIcon icon ={faSeedling} transform="shrink-8" fontSize = {'2rem'} className = {'icon-dark-blue'} />
                <FontAwesomeIcon id="not vegetarian" icon ={faBan} fontSize = {'2rem'} className = {'icon-red'} />
                </span>
            )}
            </Col>
            <Col style = {{width:'2.1rem'}} className='flex-shrink-0 flex-grow-0'>
                {isDogSafe ? (
                    <FontAwesomeIcon  icon ={faDog} transform="shrink-2" className = {'icon-dark-blue'} fontSize = {'2rem'} />
                ) : (
                    <span className='fa-layers fa-fw balloon-tooltip-danger' aria-label="Not safe for dogs" data-balloon-pos="down">
                    <FontAwesomeIcon icon ={faDog} transform="shrink-8" fontSize = {'2rem'} className = {'icon-dark-blue'} />
                    <FontAwesomeIcon id="not safe for dogs" icon ={faBan} fontSize = {'2rem'} className = {'icon-red'} />
                    </span>
                )}
            </Col>

            </Row>
            </>

        )
    }



}

export default GFV