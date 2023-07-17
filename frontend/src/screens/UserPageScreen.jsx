import React from "react"
import {Row, Col, Container, ListGroup} from "react-bootstrap"


const UserPageScreen = ({permissions}) => {
    if (permissions){
        const user = permissions[0]
    } else {
        const user = null
    }

    return(
        <main>
            {permissions && (<Container>
                <Row>
                    <Col>
                    <h1>User profile</h1>
                    <Row>
                        {permissions.includes('is-author') &&(
                            <Col>
                                <h2>Recipes</h2>
                            </Col>
                        )}
                        {permissions.includes('is-commentor') &&(
                            <Col>
                                <h2>Comments</h2>
                            </Col>
                        )}
                    </Row>
                    </Col>
                </Row>
            </Container>)}
            
        </main>
    )
}

export default UserPageScreen