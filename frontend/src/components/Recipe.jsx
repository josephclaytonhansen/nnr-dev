import React from "react"
import Ingredients from "./Ingredients"
import Instructions from "./Instructions"
import GFV from "./GFV"
import '../css/Recipe.css'
import {Row, Col, Container, Card, Image} from "react-bootstrap"
import remarkGfm from "remark-gfm"
import ReactMarkdown from "react-markdown"
import Comments from "./Comments"
import ShareBar from "./ShareBar"

const Recipe = ({recipe}) => {
    if (recipe){
        const recipe = JSON.parse(sessionStorage.getItem("recipe"))
        return(
            <main>
                <ShareBar/>
            <Container>
            {recipe && (
                <>
                <Row className = 'd-flex align-items-center'>
                    <Col lg = {9} md ={6} sm = {12}>
                        <Row>
                            <Col>
                            <h1>{recipe.name}</h1>
                            </Col>
                        </Row>

                    </Col>
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
                {recipe.content.length > 0 && (
                    <Container>
                    <Row className="my-4 gy-2">
                        <Col sm={12}>
                        <Card>
                            <Card.Body>
                            <Row className="gy-2">
                                <Col>
                                <ReactMarkdown children = {recipe.content} remarkPlugins={[remarkGfm]}></ReactMarkdown>
                                </Col>
                                <Col sm={12} lg = {4}>
                                <Image src={recipe.image} rounded fluid/>
                                </Col>
                            </Row>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                </Container>
                )}
                <Container>
                <Row className="my-4 gy-2">
                    <Col sm={12}>

                        <Comments comments={recipe.comments}/>
                        
                    </Col>
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