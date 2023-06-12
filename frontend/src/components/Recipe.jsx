import React from "react"
import Ingredients from "./Ingredients"
import Instructions from "./Instructions"
import GFV from "./GFV"
import '../css/Recipe.css'
import {Row, Col, Container} from "react-bootstrap"

const Recipe = ({recipe}) => {
    if (recipe){
        const recipe = JSON.parse(sessionStorage.getItem("recipe"))
        return(
            <Container>
            {recipe && (
                <>
                <Row className = 'd-flex align-items-center'><Col md ={9}><h1>{recipe.name}</h1></Col>
                <Col md={3}>
                    <GFV recipe={recipe}/>
                </Col>
                </Row>
                
                <Container>
                <Row>
                    <Col md={6} sm={12}><Ingredients recipe={recipe}/></Col>
                
               <Col md={6} sm={12}><Instructions recipe={recipe}/></Col> 
                </Row>
                </Container>
                </>
            )}
                        
            </Container>
        )
    }
    
}

export default Recipe