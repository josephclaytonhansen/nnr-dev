import express from 'express'
const router = express.Router()

import {
    createComment,
    updateComment,
    flagComment,
    togglePending,
    deleteComment,
} from '../controllers/commentController.js'

router.route('/').post(createComment)
router.route('/:id').put(updateComment)
router.route('/:id').delete(deleteComment)
router.route('/flag/:id').put(flagComment)
router.route('/pending/:id').put(togglePending)

export default router