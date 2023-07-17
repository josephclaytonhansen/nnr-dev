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
router.route('/id/:id').put(updateComment)
router.route('/id/:id').delete(deleteComment)
router.route('/flag/:id').put(flagComment)
router.route('/pending/:id').put(togglePending)

export default router