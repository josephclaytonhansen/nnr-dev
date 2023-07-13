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

//Public routes
router.route('/register').post((req, res, next) => {
    User.register(
        new User({ 
          email: req.body.email, 
          username: req.body.email 
        }), req.body.password, function (err, msg) {
          if (err) {
            const sanitized = err.message.replace(/[^a-zA-Z0-9 ]/g, '')
            res.send(sanitized)
          } else {
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    res.status(203).send(err)
                } else {
                    if(user) {
                        user.authSession = new authSession({user: user._id})
                        req.login(user, err => {
                            req.session.user = user
                            console.log(req.session.user)
                            res.cookie('user', user._id, COOKIE_OPTIONS)
                            res.status(200).send(user._id)
                        })
                    } else {
                        res.status(202).send(info)
                    }
                }
            })(req, res, next)

          }
        }
      )
})

router.route('/login').post((req, res, next) => {
    User.findOne({email: {$eq: req.body.email}}).then(user => {
        console.log("\nLogging in user...\n")
        if(user) {
            passport.authenticate('local', {successRedirect:process.env.FRONT_END_URL}, function(err, user, info){
                if(user){
                user.authSession = new authSession({user: user._id})
                res.status(200).send(JSON.stringify({"auth":authToken(user)}))
            }
            })(req, res, next)
        } else {
            res.status(202).send('User not found')
        }
    }).catch(err => console.log(err))
})


export default router
