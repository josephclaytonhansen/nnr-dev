import React from "react"
import {Row, Col, Container, ListGroup} from "react-bootstrap"
import SingleComment from "./SingleComment"
import CommentForm from "./commentForm"

const Comments = ({comments, permissions, recipe}) => {

    const canSeeFlaggedComments = permissions.includes('is-moderator') || permissions.includes('is-admin')
    const canSeePendingComments = permissions.includes('is-moderator') || permissions.includes('is-admin')
    const canComment = permissions.includes('is-commentor')

    return(
        <>
        {comments && (
                <ListGroup variant='flush'>
                    {comments.map((comment) => (
                        comment && !comment.pending ? (
                            comment.flags > 0 && canSeeFlaggedComments ? (
                                <ListGroup.Item key={comment._id}>
                                <SingleComment comment={comment} permissions = {permissions} classNames={'gray-comment deleted-comment'}/>
                            </ListGroup.Item>

                            ) : comment.flags > 0 && !canSeeFlaggedComments ? null : 
                            (
                                <ListGroup.Item key={comment._id}>
                                <SingleComment permissions = {permissions} comment={comment} />
                            </ListGroup.Item>
                            )

                        ) : comment && comment.pending && canSeePendingComments ? (
                            comment.flags > 0 && canSeeFlaggedComments ? (
                                <ListGroup.Item key={comment._id}>
                                <SingleComment permissions = {permissions} comment={comment} classNames={'gray-comment'}/>
                            </ListGroup.Item>

                            ) : comment.flags > 0 && !canSeeFlaggedComments ? null : 
                            (
                                <ListGroup.Item key={comment._id}>
                                <SingleComment permissions = {permissions} comment={comment} />
                            </ListGroup.Item>
                            )
                        ) : null

                    ))}
                    {canComment && (
                        <ListGroup.Item>
                            <CommentForm recipe={recipe}/>
                        </ListGroup.Item>
                    )}
                </ListGroup>
        )}

        </>
    )
}

export default Comments