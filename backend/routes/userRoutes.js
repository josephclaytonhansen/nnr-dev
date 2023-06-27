import express from 'express'
const router = express.Router()
import passport from 'passport'
import 'jsonwebtoken'

import {
    getUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
    getUserByIdAdmin,
} from '../controllers/admin/userController.js'

import User from '../models/userModel.js'

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
            const sanitized = sanitized.replace(/[^a-zA-Z0-9 ]/g, '')
            res.send(sanitized)
          } else {
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    res.status(203).send(err)
                } else {
                    if(user) {
                        req.login(user, err => {
                            req.session.user = user
                            console.log(req.session.user)
                            const token = getToken(user._id)
                            res.cookie('user', user._id, COOKIE_OPTIONS)
                            res.cookie('refreshToken', getRefreshToken(user._id), COOKIE_OPTIONS)
                            user.refreshToken.push(getRefreshToken(user._id))
                            res.status(200).send({success: true, token})
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
        if(user) {
            passport.authenticate('local', {successRedirect:process.env.FRONT_END_URL}, (err, user, info) => {
                if(err) {
                    res.status(203).send(err)
                } else {
                    if(user) {
                        req.login(user, err => {
                            req.session.user = user
                            console.log(req.session.user)
                            const token = getToken(user._id)
                            res.cookie('user', user._id, COOKIE_OPTIONS)
                            res.cookie('refreshToken', getRefreshToken(user._id), COOKIE_OPTIONS)
                            user.refreshToken.push(getRefreshToken(user._id))
                            res.status(200).send({success: true, token})
                            
                            
                        })
                    } else {
                        res.status(202).send(info)
                    }
                }
            })(req, res, next)
        } else {
            res.status(202).send('User not found')
        }
    }).catch(err => console.log(err))
})

router.post("/refreshToken", (req, res) => {
    const {signedCookies = {}} = req
    const {refreshToken} = signedCookies
    if(refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, process.env.JWT_SECRET)
            const {_id} = payload
            User.findOne({_id}).then(user => {
                if(user) {
                    const tokenIndex = user.refreshToken.indexOf(refreshToken)
                    if(tokenIndex > -1) {
                        res.status(401).send('Unauthorized')
                    } else {
                        const token = getToken(user._id)
                        const newRefreshToken = getRefreshToken(user._id)
                        user.refreshToken[tokenIndex] = {refreshToken: newRefreshToken}
                        user.save().then(() => {
                            res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS)
                            res.status(200).send({success: true, token})
                        })
                    }
                } else {
                    res.status(401).send('Unauthorized')
                }
            })
        } catch (error) {
            res.status(401).send('Unauthorized')
        }
    }
})

export default router
