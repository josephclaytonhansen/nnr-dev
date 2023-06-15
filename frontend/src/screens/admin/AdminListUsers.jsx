import React from "react"
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const AdminListUsers = () => {
    const users = JSON.parse(sessionStorage.getItem("users"))

    return(
        <Row>
        <Col lg = {4} md = {6}>
        {users && (
            <ListGroup variant='flush'>
                {users.map((user) => (
                    <ListGroup.Item key={user.id}>
                        <Link className = "recipe-row-link">
                        <Row className = ''>
                            <Col lg = {11} md = {9}>
                                <p><strong>{user.displayName}</strong><br/>
                                {user.email}<br/>
                                {user.password}<br/>
                                {user.permissions}</p>
                            </Col>
                            <Col lg = {1} md= {2}>
                                <Button variant='light' className='btn'>
                                <Link><FontAwesomeIcon icon={faEdit}/></Link>
                                </Button>
                            </Col>

                        </Row>
                        </Link>
                    </ListGroup.Item>
                ))}

            </ListGroup>)}
            </Col>
        </Row>
    )
}

export default AdminListUsers