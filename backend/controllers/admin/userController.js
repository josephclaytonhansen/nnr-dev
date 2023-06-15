import asyncHandler from "../../middleware/asyncHandler"
import User from "../../models/userModel.js"

// @desc    Create user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
    const {
        displayName,
        email,
        password,
    } = req.body
    const userExists = await User.findOne({ email: {$eq: email} })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    } else {
        const user = await User.create({
            displayName,
            email,
            password,
        })
        if (user) {
            res.status(201).json({
                _id: user._id,
                displayName: user.displayName,
                email: user.email,
                password: user.password,
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc    Get user by id
// @route   GET /api/users/id/:id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.json([user.displayName, user.email, user.password])
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
        res.json([user.displayName, user.email, user.password, user.permissions])
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
    if (user) {
        user.displayName = req.body.displayName || user.displayName
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password
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

