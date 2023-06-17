import passport from 'passport'
import jwt from 'jsonwebtoken'
const dev = process.env.NODE_ENV !== 'production'

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: !dev,
    signed: true,
    sameSite: 'none',
    maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
}

const getToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: eval(process.env.SESSION_EXPIRY)})
}

const getRefreshToken = (user) => {
    const refreshToken = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY)})
    return refreshToken
}

const verifyUser = passport.authenticate('jwt', {session: false})

export {getToken, getRefreshToken, COOKIE_OPTIONS, verifyUser}