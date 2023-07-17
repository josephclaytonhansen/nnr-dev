import asyncHandler from '../middleware/asyncHandler.js'
import Comment from '../models/commentModel.js'

//create
const createComment = asyncHandler(async (req, res) => {
    const {
        user,
        comment,
        rating,
        recipe,
    } = req.body
    const commentExists = await Comment.findOne({
        user: user,
        recipe: recipe,
        rating,
        comment: comment,
    })
    if (commentExists) {
        res.status(400)
        throw new Error('Comment already exists')
    } else {
        const comment = await Comment.create({
            user,
            comment,
            rating,
            recipe,
        })
        if (comment) {
            res.status(201).json({
                _id: comment._id,
                user: comment.user,
                content: comment.comment,
                rating: comment.rating,
                recipe: comment.recipe,
            })
        } else {
            res.status(400)
            throw new Error('Invalid comment data')
        }
    }
})


//update
const updateComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    if (comment) {
        comment.content = req.body.content || comment.content
        comment.save()
        res.json(comment)
    } else {
        res.status(404)
        throw new Error('Comment not found')
    }
})

//flag
const flagComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    if (comment) {
        comment.flags += 1
        comment.save()
        res.json(comment)
    } else {
        res.status(404)
        throw new Error('Comment not found')
    }
})

//toggle pending
const togglePending = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    if (comment) {
        comment.isPending = !comment.isPending
        comment.save()
        res.json(comment)
    } else {
        res.status(404)
        throw new Error('Comment not found')
    }
})

//delete
const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    if (comment) {
        await comment.deleteOne()
        res.json({message: 'Comment removed'})
    } else {
        res.status(404)
        throw new Error('Comment not found')
    }
})

export {
    createComment,
    updateComment,
    flagComment,
    togglePending,
    deleteComment,
}