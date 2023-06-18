import express from 'express'
const router = express.Router()
import passport from 'passport'

import {
    getUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
    getUserByIdAdmin,
    registerUser,
    loginUser,
} from '../controllers/admin/userController.js'

import User from '../models/userModel.js'

//Admin routes (needs protect/admin middleware)
router.route('/').get(getUsers)
router.route('/:id').get(getUserByIdAdmin)
router.route('/:id').put(updateUserById)
router.route('/:id').delete(deleteUserById)
router.route('/email/:email').get(getUserByEmail)


//Private routes (must be logged in)
router.route('/:id').get(getUserById)

//Public routes
router.route('/register').post(registerUser)
router.route('/login').post(passport.authenticate('local'), loginUser)



export default router
