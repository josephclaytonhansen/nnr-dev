import asyncHandler from '../../middleware/asyncHandler.js'
import User from "../../models/userModel.js"
import {getToken, getRefreshToken, COOKIE_OPTIONS} from '../../config/authenticate.js'
import authSession from '../../models/userModel.js'


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    const user = req.user || req.session.user || req.session.passport.user
    res.json({'users': users, 'user': user})
})

// @desc    Get user by id
// @route   GET /api/users/id/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.json([user.displayName, user.email, user.permissions, user.authSession._id])
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc     Get user by id (admin)
//@route    GET /api/users/admin/:id
//@access   Private/Admin
const getUserByIdAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.json([user.displayName, user.email, user.permissions, user.authSession._id])
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

//@desc     Get user by email
//@route    GET /api/users/email/:email
//@access   Private/Admin
const getUserByEmail = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: {$eq: req.params.email} })
    if (user) {
        res.json(user)
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc     Get user by permissions
//@route    GET /api/users/permissions/:permissions
//@access   Private/Admin
const getUserByPermissions = asyncHandler(async (req, res) => {
    const user = await User.find({ $text: {$search: req.params.permissions} })
})

// @desc    Update user by id
// @route   PUT /api/users/id/:id
// @access  Private/Admin
const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    console.log(req.body)
    if (user) {
        user.displayName = req.body.displayName

        if (req.body.password){
            user.password = req.body.password
        } 
        if (req.body.email){
            user.email = req.body.email
        }
        if (req.body.displayName.startsWith('anon')){
            user.email = req.body.displayName + '@anon.com'
            user.username = req.body.displayName
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            displayName: updatedUser.displayName,
            email: updatedUser.email,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Delete user by id
// @route   DELETE /api/users/id/:id
// @access  Private/Admin
const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.deleteOne()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    getUsers,
    getUserById,
    getUserByIdAdmin,
    getUserByEmail,
    updateUserById,
    deleteUserById,
}

