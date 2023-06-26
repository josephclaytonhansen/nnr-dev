export const admin = (req, res, next) => {
    if(req.user && req.user.permissions.includes('is-admin')) {
        next()
    } else {
        res.status(401).send({message: 'Not authorized as an admin'})
    }
}