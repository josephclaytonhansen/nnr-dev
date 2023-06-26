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
                            <h1 className = 'm-0'>{recipe.name}</h1>
                            <p>Takes {recipe.timeToMake} minutes to make</p>
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
                              <div class = 'd-flex justify-content-center align-items-center pt-5'><p style = {{fontSize:"65%"}}>
                    I don't run ads on this site and I never will, so it's solely supported by donations. A couple bucks goes a long way when you have a monthly database/domain bill. I appreciate any donations more than I can say.</p>
                    <form action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="hosted_button_id" value="CA5PD4LCTR7VS" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
</form>      </div>
            </Container>

            </main>
        )
    } else {
        return(
            <>
            </>
        )
    }
    
}

export default Recipe