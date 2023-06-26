import React from "react"
import { useGetUsersQuery } from "../../slices/usersApiSlice"
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import UserPermissions from "../../components/UserPermissions"

const AdminListUsers = () => {
    const {data:users, isLoading, error} = useGetUsersQuery()
    if (!users) {window.location.href=window.location.origin} else {

    const usersCopy = [...users] || []
    usersCopy.sort((a, b) => (a.displayName > b.displayName) ? 1 : -1)
    const length = usersCopy.length
    const each = length/4
    const indices = [0, Math.ceil(each), Math.ceil(each*2), Math.ceil(each*3), length]

    //split users into four equal slices
    const usersCol1 = usersCopy.slice(indices[0], indices[1]) || []
    const usersCol2 = usersCopy.slice(indices[1], indices[2]) || []
    const usersCol3 = usersCopy.slice(indices[2], indices[3]) || []
    const usersCol4 = usersCopy.slice(indices[3], indices[4]) || []
    


    if (usersCopy){
    return(
        <Row>
        <Col lg = {3} md = {6}>
        {usersCol1 && (
            <ListGroup variant='flush'>
                {usersCol1.map((user) => (
                    <ListGroup.Item key={user.id}>
                        <Link className = "recipe-row-link">
                        <Row className = ''>
                            <Col lg = {11} md = {9}>
                                <p><strong>{user.displayName}</strong><br/></p>
                                <UserPermissions permissions = {user.permissions} />
                                

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
            <Col lg = {3} md = {6}>
        {usersCol2 && (
            <ListGroup variant='flush'>
                {usersCol2.map((user) => (
                    <ListGroup.Item key={user.id}>
                        <Link className = "recipe-row-link">
                        <Row className = ''>
                            <Col lg = {11} md = {9}>
                                <p><strong>{user.displayName}</strong><br/></p>
                                <UserPermissions permissions = {user.permissions} />
                                

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
            <Col lg = {3} md = {6}>
        {usersCol3 && (
            <ListGroup variant='flush'>
                {usersCol3.map((user) => (
                    <ListGroup.Item key={user.id}>
                        <Link className = "recipe-row-link">
                        <Row className = ''>
                            <Col lg = {11} md = {9}>
                                <p><strong>{user.displayName}</strong><br/></p>
                                <UserPermissions permissions = {user.permissions} />
                                

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
            <Col lg = {3} md = {6}>
        {usersCol4 && (
            <ListGroup variant='flush'>
                {usersCol4.map((user) => (
                    <ListGroup.Item key={user.id}>
                        <Link className = "recipe-row-link">
                        <Row className = ''>
                            <Col lg = {11} md = {9}>
                                <p><strong>{user.displayName}</strong><br/></p>
                                <UserPermissions permissions = {user.permissions} />
                                

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
    )}}
}

export default AdminListUsers