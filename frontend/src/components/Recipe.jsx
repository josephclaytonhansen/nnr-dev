import React from "react"
import Ingredients from "./Ingredients"
import Instructions from "./Instructions"
import GFV from "./GFV"
import '../css/Recipe.css'
import {Row, Col, Container, Card} from "react-bootstrap"

const Recipe = ({recipe}) => {
    if (recipe){
        const recipe = JSON.parse(sessionStorage.getItem("recipe"))
        return(
            <main>
            <Container className="recipe">
            {recipe && (
                <>
                <Row className = 'd-flex align-items-center'><Col lg = {9} md ={6} sm = {12}><h1>{recipe.name}</h1></Col>
                <Col lg = {3} md={6} sm = {8} xs = {12}>
                    <GFV fontSize='2.6rem' recipe={recipe}/>
                </Col>
                </Row>
                
                <Container>
                <Row className="my-4 gy-2">
                <Col lg = {5} md={6} sm={12}><Card><Card.Body><Ingredients recipe={recipe}/></Card.Body></Card></Col> 
                
               <Col lg = {7} md={6} sm={12}><Card><Card.Body><Instructions recipe={recipe}/></Card.Body></Card></Col> 
                </Row>
                </Container>
                </>
            )}
                        
            </Container>
            </main>
        )
    }
    
}

export default Recipe