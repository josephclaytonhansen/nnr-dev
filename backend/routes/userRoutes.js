import express from 'express'
const router = express.Router()
import passport from 'passport'
import {authToken, verifyToken} from '../config/userAuthToken.js'

import {
    getUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
    getUserByIdAdmin,
} from '../controllers/admin/userController.js'

import User from '../models/userModel.js'
import authSession from '../models/userModel.js'

import {getToken, getRefreshToken, COOKIE_OPTIONS} from '../config/authenticate.js'
import {admin} from '../middleware/authMiddleware.js'

//Admin routes (needs protect/admin middleware)
router.route('/').get(admin, getUsers)
router.route('/:id').get(getUserByIdAdmin)
router.route('/:id').put(updateUserById)
router.route('/:id').delete(deleteUserById)
router.route('/email/:email').get(getUserByEmail)


//Private routes (must be logged in)
router.route('/:id').get(getUserById)

router.route('/request-authorship/:id').get((req, res, next) => {
    User.findById(req.params.id).then(user => {
        user.permissions = user.permissions + ".authorship-requested"
        user.save().then(user => {
            res.status(200).send(JSON.stringify({"auth":authToken(user)}))
        })
    }).catch(
        res.status(200).send(JSON.stringify({"message":"User not found"}))
    )
})

//Public routes
router.route('/register').post((req, res, next) => {
    new User(
        {
            email: req.body.email,
            username: req.body.email,
            password: req.body.password,
        }
    ).save().then(user => {
        user.save().then(user => {
            res.status(200).send(JSON.stringify({"auth":authToken(user)}))
        })
    })
})


router.route('/login').post((req, res, next) => {
    
        console.log("\nLogging in user...\n")
        console.log(req.body)

            
        User.findOne({email: {$eq: req.body.email}}).then(async user => {
            const isMatch = await user.matchPassword(req.body.password)
            if (!isMatch) {
                res.status(401).json({message: "Incorrect credentials"})
            } else {
                
                req.login(user, err => {
                    req.session.user = user
                })
                user.save().then(user => {
                    res.status(200).send(JSON.stringify({"auth":authToken(user)}))
                })
                
            }

            
        }).catch(err => console.log(err))

    
})


export default router
