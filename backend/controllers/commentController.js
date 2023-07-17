import asyncHandler from '../middleware/asyncHandler.js'
import Comment from '../models/commentModel.js'
import Recipe from '../models/recipeModel.js'

//get comments for a recipe
const getCommentsByRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    if (recipe) {
        const comments = await Comment.find({recipe: recipe._id})
        res.json(comments)
    } else {
        res.status(404).send('Recipe not found')
    }
})

//create
const createComment = asyncHandler(async (req, res) => {
    const {
        user,
        content,
        rating,
        recipe,
    } = req.body

    const commentExists = await Comment.findOne({
        user: {$eq:user},
        content: {$eq:content},
        rating: {$eq:rating},
        recipe: {$eq:recipe},
    })
    if (commentExists) {
        res.status(400).json({data:'Comment already exists'})
    } else {
        
            await Recipe.findOne({_id: {$eq:recipe}}).then(recipe => {
                const comment = Comment.create({
                    user,
                    content,
                    rating,
                    recipe,
                }).then(comment => {
                recipe.comments.push(comment)
                console.log(recipe.comments)
                recipe.save()
                res.status(201).json({
                    _id: comment._id,
                    user: comment.user,
                    content: comment.content,
                    rating: comment.rating,
                    recipe: comment.recipe,
                })
            }).catch(err => {
                res.status(400)
            })
        }).catch(err => {
            res.status(400)
        })
    }
})



//update
const updateComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById({_id: {$eq:req.params.id}})
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
    getCommentsByRecipe,
}