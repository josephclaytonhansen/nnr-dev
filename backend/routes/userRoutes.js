import express from 'express'
const router = express.Router()

import {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUserById,
    deleteUserById,
    getUserByIdAdmin,
} from '../controllers/admin/userController.js'

//Admin routes (needs protect/admin middleware)
router.route('/').get(getUsers)
router.route('/:id').get(getUserByIdAdmin)
router.route('/:id').put(updateUserById)
router.route('/:id').delete(deleteUserById)


//Public routes
router.route('/:id').get(getUserById)
router.route('/register').post(createUser)
