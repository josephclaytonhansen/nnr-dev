import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import passportLocalMongoose from 'passport-local-mongoose'

const authSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

const authSession = mongoose.model('authSession', authSessionSchema)

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
    authSession: {
        type: authSessionSchema,
    },

})

userSchema.pre('save', async function (next) {
    try{
        const user = this
       

        user.username = user.email
        user.authSession = new authSession ({user: user._id})

        if (!user.isModified('password')) next()
        // generate salt
        const salt = await bcrypt.genSalt(12)
        // hash the password
        const hashedPassword = await bcrypt.hash(this.password, salt)
         // replace plain text password with hashed password
        this.password = hashedPassword

        
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.pre('validate', async function (next) {
    try{
        const user = this
        
        user.username = user.email
        //set user.authSession to a new Session object with user._id as the value of user
        user.authSession = new authSession ({user: user._id})

        if (!user.isModified('password')) next()
        // generate salt
        const salt = await bcrypt.genSalt(12)
        // hash the password
        const hashedPassword = await bcrypt.hash(this.password, salt)
         // replace plain text password with hashed password
        this.password = hashedPassword
        
        next()
    } catch (error) {
        next(error)
    }
})


userSchema.set('toJSON', {
    transform: (document, ret, options) => {
        delete ret.password
        return ret
    }
})


userSchema.methods.matchPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (error) {
      throw new Error(error)
    }
   };

//userSchema.plugin(passportLocalMongoose, {usernameField: 'email'})

const User = mongoose.model('User', userSchema)
export default User