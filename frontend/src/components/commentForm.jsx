import React from 'react'
import { Form, FormControl, FormGroup, Button } from 'react-bootstrap'

import { useCreateCommentMutation } from '../slices/commentsApiSlice'

const CommentForm = ({recipe, permissions}) => {

const [createComment, { isLoading, isError, error }] = useCreateCommentMutation()
    const submitHandler = () => {
        let comment = document.getElementById('comment').value
        createComment({recipe: recipe.id, comment: comment})
}

    return(
        <>
        </>
    )
}

export default CommentForm