import mongoose from 'mongoose'


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        unique: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
    },
    flags: {
        type: Number,
        required: true,
        unique: false,
        default: 0,
    },
    rating: {
        type: Number,
    },
    flagged: {
        type: Boolean,
        required: true,
        default: false,
    },
    pending: {
        type: Boolean,
        required: true,
        default: true,
    },

}, {timestamps: true})

commentSchema.pre('save', async function (next) {
    try {
        const comment = this
        if (comment.flags > 2) {
            comment.flagged = true
        }
        next()
    } catch (error) {
        next(error)
    }
})


const Comment = mongoose.model('Comment', commentSchema)
export default Comment