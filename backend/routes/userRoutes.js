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

} from '../controllers/admin/userController.js'

import User from '../models/userModel.js'

import {getToken, getRefreshToken, COOKIE_OPTIONS} from '../config/authenticate.js'

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
router.post('/login', passport.authenticate('local', (err, req, res, next) => {

    if (err) { return next(err) }

/*     const token = getToken({_id: req.user._id})
    const refreshToken = getRefreshToken({_id: req.user._id})
    User.findById(req.user._id).then(
        user => {
            user.refreshToken.push({refreshToken})
            user.save().then(
                res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS),
                res.send({success: true, token: 'Bearer '+token})
            ).catch(err => next(err))
        }
    ).catch(err => next(err)) */

}))



export default router
