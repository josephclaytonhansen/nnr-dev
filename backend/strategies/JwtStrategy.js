import passport from 'passport'
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'
import User from '../models/userModel.js'

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET

const jwtStrategy = new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne({_id: jwt_payload.id}, (err, user) => {
        if(err) {
            return done(err, false)
        }
        if(user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
})