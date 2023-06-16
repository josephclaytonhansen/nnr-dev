import React from "react"
import {Row, Col, Container, ListGroup} from "react-bootstrap"
import SingleComment from "./SingleComment"

const Comments = ({comments}) => {

    const canSeeFlaggedComments = true
    const canSeePendingComments = true
    //REPLACE with real user data!

    return(
        <>
        {comments && (
                <ListGroup variant='flush'>
                    {comments.map((comment) => (
                        comment && !comment.pending ? (
                            comment.flags > 0 && canSeeFlaggedComments ? (
                                <ListGroup.Item key={comment._id}>
                                <SingleComment comment={comment} classNames={'gray-comment deleted-comment'}/>
                            </ListGroup.Item>

                            ) : comment.flags > 0 && !canSeeFlaggedComments ? null : 
                            (
                                <ListGroup.Item key={comment._id}>
                                <SingleComment comment={comment} />
                            </ListGroup.Item>
                            )

                        ) : comment && comment.pending && canSeePendingComments ? (
                            comment.flags > 0 && canSeeFlaggedComments ? (
                                <ListGroup.Item key={comment._id}>
                                <SingleComment comment={comment} classNames={'gray-comment'}/>
                            </ListGroup.Item>

                            ) : comment.flags > 0 && !canSeeFlaggedComments ? null : 
                            (
                                <ListGroup.Item key={comment._id}>
                                <SingleComment comment={comment} />
                            </ListGroup.Item>
                            )
                        ) : null

                    ))}
                </ListGroup>
        )}
        </>
    )
}

export default Comments