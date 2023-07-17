import express from 'express'
const router = express.Router()

import {
    createComment,
    updateComment,
    flagComment,
    togglePending,
    deleteComment,
    getCommentsByRecipe,
} from '../controllers/commentController.js'

router.route('/').post(createComment)
router.route('/:id').get(getCommentsByRecipe)
router.route('/:id').put(updateComment)
router.route('/delete/:id').get(deleteComment)
router.route('/flag/:id').get(flagComment)
router.route('/pending/:id').put(togglePending)

export default router