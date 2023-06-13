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
            <main>
            <Container className="recipe">
            {recipe && (
                <>
                <Row className = 'd-flex align-items-center'><Col md ={9} sm = {12}><h1>{recipe.name}</h1></Col>
                <Col lg = {3} md={6} sm = {8} xs = {12}>
                    <GFV fontSize='2.6rem'/>
                </Col>
                </Row>
                
                <Container>
                <Row>
                    <Col md={6} sm={12}>
                        <Ingredients/>
                        </Col>
                
               <Col md={6} sm={12}><Instructions recipe={recipe}/></Col> 
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