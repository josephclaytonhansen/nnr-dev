import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        unique: false,
        default: `User-${Math.floor(100000 + Math.random() * 900000).toString()}`
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type:String,
        required: true,
    },
    permissions: {
        type: String,
        required: true,
        unique: false,
        default: 'is-user.is-commentor.is-self-email-editor.is-self-display-name-editor.is-self-comment-editor.is-not-rater.is-not-comment-flagger.not-verified.not-author.not-editor.not-moderator.not-admin'
    },

})

userSchema.pre('save', async function (next) {
    try{
        const user = this
        if (!user.isModified('password')) return next()
        const passwordSalt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(user.password, passwordSalt)
        user.password = passwordHash
        const permissionsSalt = await bcrypt.genSalt(12)
        const permissionsHash = await bcrypt.hash(user.permissions, permissionsSalt)
        user.permissions = permissionsHash
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.matchPassword = async function (password) {
    try {
        const user = this
        return await bcrypt.compare(password, user.password)
    } catch (error) {
        throw new Error(error)
    }
}

const User = mongoose.model('User', userSchema)
export default User