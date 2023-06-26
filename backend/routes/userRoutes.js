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
router.route('/register').post((req, res, next) => {
    User.register(
        new User({ 
          email: req.body.email, 
          username: req.body.email 
        }), req.body.password, function (err, msg) {
          if (err) {
            res.send(err.replace(/ /g, '-'))
          } else {
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    res.status(203).send(err)
                } else {
                    if(user) {
                        req.login(user, err => {
                            req.session.user = user
                            console.log(req.session)
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


export default router
