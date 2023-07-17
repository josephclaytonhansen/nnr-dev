import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faFlag, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import {Row, Col, Container, Card, Badge} from "react-bootstrap"
import StarRating from "./StarRating"
import  "../css/Recipe.css"
import {useGetUserByIdQuery} from "../slices/usersApiSlice"
import Loader from "./Loader"
import { COMMENTS_URL, BASE_URL } from "../constants"

const SingleComment = ({comment, permissions, classNames = ''}) => {

    let [flags, setFlags] = React.useState(comment.flags)
    let [deleted, setDeleted] = React.useState(false)

    const FlagCommentHandler = () => {
        fetch(`${BASE_URL}/api/comments/flag/${comment._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(setFlags(flags + 1))

    }
    const EditCommentHandler = () => {}
    const DeleteCommentHandler = () => {
        fetch(`${BASE_URL}/api/comments/delete/${comment._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(setDeleted(true))
    }

    const canFlag = permissions.includes('is-flagger')
    const [username] = permissions.slice(-1)
    const canEdit = username === comment.user.email
    const canDelete = permissions.includes('is-admin') || canEdit
    const canModerate = permissions.includes('is-admin') || permissions.includes('is-moderator')
    const {data: commentUser, isLoading, error} = useGetUserByIdQuery(comment.user)
    const commentUserName = commentUser ? commentUser[0] : 'Anonymous'

    return(
        <>
        {isLoading && (<Loader/>)}
        {(commentUser && !deleted) && (
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
                        <div className={flags > 0 ? 'custom-badge bg-red' : 'custom-badge bg-transparent'} style = {{borderRadius:'100%', padding:'3px', marginRight:'.25rem'}}>{flags}</div>
                    )}
                    <FontAwesomeIcon onClick={FlagCommentHandler} icon={faFlag} className="icon-hover-dark-blue icon-dark-blue"/>
                </Col>
            )} 
            
            {canEdit && (
                <Col className = 'flex-grow-0 flex-shrink-0'>
                    <FontAwesomeIcon onClick = {EditCommentHandler} icon={faEdit} className="icon-hover-dark-blue icon-dark-blue"/>
                </Col>
            )}

            {canDelete && (
                <Col className = 'flex-grow-0 flex-shrink-0'>
                    <FontAwesomeIcon onClick = {DeleteCommentHandler} icon={faTrash} className="icon-hover-dark-blue icon-dark-blue"/>
                </Col>
            )}
            

        </Row>
            </>
        )}
        
        </>
    )
}

export default SingleComment
