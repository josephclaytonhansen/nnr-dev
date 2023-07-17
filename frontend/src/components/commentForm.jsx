import React from 'react'
import { Form, FormControl, FormGroup, Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import {toast } from 'react-toastify'
import { useCreateCommentMutation } from '../slices/commentsApiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'

const CommentForm = ({recipe, user}) => {

const [createComment, { isLoading, isError, error }] = useCreateCommentMutation()

    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)


    const handleClick = (e) => {
        let rating = parseFloat(e.target.id)
        setRating(rating)

            document.getElementById('rating-under').classList.toggle('icon-red')

    }

    const handleHover = (e) => {
        let hover = parseFloat(e.target.id)
        document.getElementById('rating-under').classList.remove('icon-red')
        setHover(hover)
    }


    const submitHandler = async() => {
        let comment = document.getElementById('comment').value
        const res = await createComment({recipe: recipe._id, content: comment, rating: rating, user: user})
        toast.success('Comment submitted')
        window.location.reload()
}

    return(
        <>
        <Row>
            <Col>
            <Row >
                <Col style = {{maxWidth:'10rem'}}>
                <h6>Leave a comment</h6>
                </Col>

                <Col>
                    <div className='rating' style = {{width:`6rem`, height:`1rem`}}>
                        <div id='rating-under' style = {{position:'relative', width:'100%', height:'1.5rem'}}>
                            <FontAwesomeIcon icon = {hover <= 0.5 ? faStarEmpty : hover <= 1 ? faStarHalfAlt : faStar}/>
                            <FontAwesomeIcon icon = {hover <= 1.5 ? faStarEmpty : hover <= 2 ? faStarHalfAlt : faStar}/>
                            <FontAwesomeIcon icon = {hover <= 2.5 ? faStarEmpty : hover <= 3 ? faStarHalfAlt : faStar}/>
                            <FontAwesomeIcon icon = {hover <= 3.5 ? faStarEmpty : hover <= 4 ? faStarHalfAlt : faStar}/>
                            <FontAwesomeIcon icon = {hover <= 4.5 ? faStarEmpty : hover < 5 ? faStarHalfAlt : faStar}/>
                        </div>
                        <div id='rating-over' style = {{position:'relative', display:`flex`, width:'calc((1rem+2px)*5)', height:'1.5rem', top:'-1.5rem'}}>
                            {[`0.5`, `1`, `1.5`, `2`, `2.5`, `3`, `3.5`, `4`, `4.5`, `5`].map((star, i) => {
                                return(
                                    <div key = {i} style = {{width:`9px`, height:`100%`}} id = {star} onMouseOver={handleHover} onClick = {handleClick}>
                                        
                                    </div>
                                )
                            })}
                            
                        </div>
                    </div>
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