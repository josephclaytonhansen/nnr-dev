import jwt from 'jsonwebtoken'

const authToken = (user) => {
    console.log("\nCreating authToken\n")
    console.log('user: ', user, 'session: ', user.authSession._id)
    return jwt.sign({user: user._id, session: user.authSession._id}, process.env.JWT_SECRET, {expiresIn: eval(process.env.SESSION_EXPIRY)})
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export {authToken, verifyToken}