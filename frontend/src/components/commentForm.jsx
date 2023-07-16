import React from 'react'
import { Form, FormControl, FormGroup, Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import {toast } from 'react-toastify'
import { useCreateCommentMutation } from '../slices/commentsApiSlice'

const CommentForm = ({recipe, user}) => {

const [createComment, { isLoading, isError, error }] = useCreateCommentMutation()

    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)

    const handleClick = (e) => {
        let rating = e.target.id
        setRating(rating)
    }

    const handleHover = (e) => {
        let hover = e.target.id
        setHover(hover)
    }


    const submitHandler = () => {
        let comment = document.getElementById('comment').value
        const res = createComment({recipe: recipe._id, comment: comment, rating: rating, user: user})
        if (res){
            toast.success('Comment submitted')
        }
        else if (isError) {
            toast.error(error?.message || error?.error || 'Unknown error')
        }
}

    return(
        <>
        <Row>
            <Col>
            <Row>
                <Col>
                <h6>Leave a comment</h6>
                </Col>

            </Row>
            
            <Form>
                <FormGroup className = {`py-2`}>
                    <FormControl as='textarea' id='comment' placeholder='Comment' />
                </FormGroup>
                <Button onClick={submitHandler}>Submit</Button>
            </Form>
            </Col>
        </Row>

        </>
    )
}

export default CommentForm