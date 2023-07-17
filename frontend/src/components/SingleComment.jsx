import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFlag, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import {Row, Col, Container, Card, Badge} from "react-bootstrap"
import StarRating from "./StarRating"
import  "../css/Recipe.css"
import {useGetUserByIdQuery} from "../slices/usersApiSlice"

const SingleComment = ({comment, permissions, classNames = ''}) => {
    console.log(comment)
    const flagCommentHandler = () => {}
    const editCommentHandler = () => {}
    const deleteCommentHandler = () => {}

    const canFlag = permissions.includes('is-flagger')
    const [username] = permissions.slice(-1)
    const canEdit = username === comment.user.email
    const canDelete = permissions.includes('is-admin') || canEdit
    const canModerate = permissions.includes('is-admin') || permissions.includes('is-moderator')
    const {data: commentUser, isLoading, error} = useGetUserByIdQuery(comment.user)
    console.log(commentUser)
    const commentUserName = commentUser[0]

    return(
        <>
        <Row className={`my-1 d-flex align-items-center ${classNames}`}>
            <Col>
            <h5 className='my-1'>{commentUserName}</h5>
            </Col>
            <Col style = {{flexGrow:12}}>
            <StarRating rating={comment.rating}/>
            </Col>
        </Row>

        <Row className={`${classNames}`}> 
            <Col>
            <p>{comment.content}</p>
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
