import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import passportLocalMongoose from 'passport-local-mongoose'

const Session = new mongoose.Schema({
    refreshToken: {
        type: String,
        default: '',
    },
})

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        unique: false,
        default: `User-${Math.floor(Date.now() / Math.random()).toString()}`
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
        default: 'is-user.is-commentor.is-self-email-editor.is-self-display-name-editor.is-self-comment-editor'
    },
    refreshToken: {
        type: [Session],
    },

})

userSchema.pre('save', async function (next) {
    try{
        const user = this
        if (!user.isModified('password')) return next()
        const passwordSalt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(user.password, passwordSalt)
        user.password = passwordHash
        
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.pre('validate', async function (next) {
    try{
        const user = this
        if (!user.isModified('password')) return next()
        const passwordSalt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(user.password, passwordSalt)
        user.password = passwordHash
        
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

userSchema.set('toJSON', {
    transform: (document, ret, options) => {
        delete ret.refreshToken
        return ret
    }
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User', userSchema)
export default User