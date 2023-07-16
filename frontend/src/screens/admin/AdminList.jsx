import React from "react"
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const AdminList = () => {
    const recipes = JSON.parse(sessionStorage.getItem("recipes")).recipes
    console.log(recipes)
    
    let recipesCopy = [...recipes]
    recipesCopy.sort((a, b) => (a.dateModified > b.dateModified) ? -1 : 1)

    const recipesCol1 = recipesCopy.slice(0, Math.ceil(recipes.length/3))
    const recipesCol2 = recipesCopy.slice(Math.ceil(recipes.length/3), Math.ceil(recipes.length/3)*2)
    const recipesCol3 = recipesCopy.slice(Math.ceil(recipes.length/3)*2, recipes.length)

    return(
        <Row>
        <Col lg = {4} md = {6}>
        {recipesCol1 && (
            <ListGroup variant='flush'>
                {recipesCol1.map((recipe) => (
                    <ListGroup.Item key={recipe.id}>
                        <Link to = {`/recipes/${recipe.slug}`} className = "recipe-row-link">
                        <Row className = ''>
                            <Col lg = {11} md = {9}>
                                <strong><p>{recipe.name}</p></strong>
                            </Col>
                            <Col lg = {1} md= {2}>
                                <Button variant='light' className='btn'>
                                <Link to={`/admin/recipe/${recipe._id}`}><FontAwesomeIcon icon={faEdit}/></Link>
                                </Button>
                            </Col>

                        </Row>
                        </Link>
                    </ListGroup.Item>
                ))}

            </ListGroup>)}
            </Col>
            <Col lg = {4} md = {6}>
        {recipesCol2 && (
            <ListGroup variant='flush'>
                {recipesCol2.map((recipe) => (
                    <ListGroup.Item key={recipe.id}>
                        <Link to = {`/recipes/${recipe.slug}`} className = "recipe-row-link">
                        <Row className = ''>
                            <Col lg = {11} md = {9}>
                                <strong><p>{recipe.name}</p></strong>
                            </Col>
                            <Col lg = {1} md = {2}>
                                <Button variant='light' className='btn'>
                                <Link to={`/admin/recipe/${recipe._id}`}><FontAwesomeIcon icon={faEdit}/></Link>
                                </Button>
                            </Col>

                        </Row>
                        </Link>
                    </ListGroup.Item>
                ))}

            </ListGroup>)}
            </Col>
            <Col lg = {4} md = {6}>
        {recipesCol3 && (
            <ListGroup variant='flush'>
                {recipesCol3.map((recipe) => (
                    <ListGroup.Item key={recipe.id}>
                        <Link to = {`/recipes/${recipe.slug}`} className = "recipe-row-link">
                        <Row className = ''>
                            <Col lg = {11} md ={9}>
                                <strong><p>{recipe.name}</p></strong>
                            </Col>
                            <Col lg = {1} md = {2}>
                                <Button variant='light' className='btn'>
                                    <Link to={`/admin/recipe/${recipe._id}`}><FontAwesomeIcon icon={faEdit}/></Link>
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

export default AdminList