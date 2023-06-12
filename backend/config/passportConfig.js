import passport from 'passport'
import { LocalStrategy } from 'passport-local'
import User from '../models/userModel.js'

const passportConfig = () => {
    passport.use("local-signup", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const userExists = await User.findOne({email: {$eq: email}})
            if (userExists) {
                return done(null, false, {message: 'Email already taken'})
            } else {
                const user = await User.create({email, password})
                return done(null, user)
            }
        } catch (error) {
            return done(error)
        }
    })),
    passport.use("local-login", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'},
        async (email, password, done) => {
            try {
                const user = await User.findOne({email: {$eq: email}})
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
    ))
}

export default passportConfig