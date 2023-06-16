import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFlag, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import {Row, Col, Container, Card, Badge} from "react-bootstrap"
import StarRating from "./StarRating"
import  "../css/Recipe.css"

const SingleComment = ({comment, classNames = ''}) => {

    const flagCommentHandler = () => {}
    const editCommentHandler = () => {}
    const deleteCommentHandler = () => {}

    const canFlag = true
    const canEdit = true
    const canDelete = true
    const canModerate = true
    const commentUserName = 'testUser'
    //REPLACE with real user data!

    return(
        <>
        <Row className={`my-1 d-flex align-items-center ${classNames}`}>
            <Col className="flex-grow-0 flex-shrink-0">
            <h5 className='my-1'>{commentUserName}</h5>
            </Col>
            <Col>
            <StarRating rating={comment.rating}/>
            </Col>
        </Row>

        <Row className={`${classNames}`}> 
            <Col>
            <p>{comment.comment}</p>
            </Col>
        </Row>

        <Row className = {`d-flex align-items-center gx-2`}>
            {canFlag && (
                <Col className = 'flex-grow-0 flex-shrink-0 d-flex align-items-center'>
                    {canModerate && (
                        <div className={comment.flags > 0 ? 'custom-badge bg-red' : 'custom-badge bg-transparent'} style = {{borderRadius:'100%', padding:'3px', marginRight:'.25rem'}}>{comment.flags}</div>
                    )}
                    <FontAwesomeIcon onClick={flagCommentHandler} icon={faFlag} className="icon-light-gray iconClick"/>
                </Col>
            )} 
            
            {canEdit && (
                <Col className = 'flex-grow-0 flex-shrink-0'>
                    <FontAwesomeIcon onClick = {editCommentHandler} icon={faEdit} className="icon-light-gray iconClick"/>
                </Col>
            )}

            {canDelete && (
                <Col className = 'flex-grow-0 flex-shrink-0'>
                    <FontAwesomeIcon onClick = {deleteCommentHandler} icon={faTrash} className="icon-light-gray iconClick"/>
                </Col>
            )}
            

        </Row>
        </>
    )
}

export default SingleComment
