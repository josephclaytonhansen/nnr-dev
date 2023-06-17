
import { Strategy as LocalStrategy } from 'passport-local'
import { ExtractJwt } from 'passport-jwt'
import { Strategy as JwtStrategy } from 'passport-jwt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import {getToken, getRefreshToken, COOKIE_OPTIONS} from '../config/authenticate.js'

const passportConfig = (passport) => {
    passport.use("local-signup", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const userExists = await User.findOne({email: {$eq: email}})
            if (userExists) {
                return done(null, false, {message: 'Incorrect email or password'})
            } else {
                const user = await User.create({email, password})
                return done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    })),
    passport.use("local-login", new JwtStrategy({
        usernameField: 'email',
        passwordField: 'password',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,},
        async (jwt_payload, done) => {
            try {
                const user = await User.findOne({_id: {$eq: jwt_payload._id}})
                if (!user) {
                    return done(null, false, {message: 'Incorrect email or password'})
                }
                const passwordMatch = await user.matchPassword(password)
                if (!passwordMatch) {
                    return done(null, false, {message: 'Incorrect email or password'})
                }

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )),

    passport.use("can-comment", new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET,}, async (payload, done) => {
            try {
                const user = payload.user
                if (user.permissions.includes('is-commentor')) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
    )
    ),
    passport.use("can-edit-email", new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET,}, async (payload, done) => {
            try {
                const user = payload.user
                if (user.permissions.includes('is-self-email-editor')) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
    )),
    passport.use("can-edit-display-name", new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET,}, async (payload, done) => {
            try {
                const user = payload.user
                if (user.permissions.includes('is-self-display-name-editor')) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
    )),
    passport.use("can-edit-comment", new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET,}, async (payload, done) => {
            try {
                const user = payload.user
                if (user.permissions.includes('is-self-comment-editor')) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
    )),
    passport.use("can-rate", new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET,}, async (payload, done) => {
            try {
                const user = payload.user
                if (user.permissions.includes('is-rater')) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
    )),
    passport.use("can-flag-comment", new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET,}, async (payload, done) => {
            try {
                const user = payload.user
                if (user.permissions.includes('is-comment-flagger')) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
    )),
    passport.use('can-author', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET,}, async (payload, done) => {
            try {
                const user = payload.user
                if (user.permissions.includes('is-author')) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
    )),
    passport.use('can-edit', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET,}, async (payload, done) => {
            try {
                const user = payload.user
                if (user.permissions.includes('is-editor')) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            }
        }
    )),
    passport.use('can-moderate', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET,}, async (payload, done) => {
            try {
                const user = payload.user
                if (user.permissions.includes('is-moderator')) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            } 
        }
    )),
    passport.use('can-administrate', new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET,}, async (payload, done) => {
            try {
                if (user.permissions.includes('is-admin')) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            } catch (error) {
                return done(error)
            } 
        }
    ))
}

export default passportConfig
