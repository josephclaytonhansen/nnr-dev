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
    username: {
        type: String,
    },
    password: {
        type:String,
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
       

        user.username = user.email
        
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.pre('validate', async function (next) {
    try{
        const user = this
        
        user.username = user.email
        
        next()
    } catch (error) {
        next(error)
    }
})


userSchema.set('toJSON', {
    transform: (document, ret, options) => {
        delete ret.refreshToken
        return ret
    }
})

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'})

const User = mongoose.model('User', userSchema)
export default User