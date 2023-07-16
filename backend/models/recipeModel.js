import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema({
    name: {type: String, required: false, index:true},
    ingredients: [{
        name: {
            type: String,
            required: true,
            index: true,
        },
        amount: {
            type: Number,
            required: true,
            default: 0
        },
        unit: {
            type: String,
            required: true
        },
    }],
    instructions: [{
        step: {
            type: Number,
            required: true,
            default: 0
        },
        name: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
    }],
    cuisine: {
        type: String,
        required: false,
        index: true,
    },
    tags: [{
        type: String,
        required: false,
        index: true,
    }],
    source: {
        type: String,
        required: false,
        index: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    slug: {
        type: String,
        required: true,
    },
    isGlutenFree: {
        type: Boolean,
        required: true,
        default: false
    },
    isVegetarian: {
        type: Boolean,
        required: true,
        default: false
    },
    meal: {
        type: String,
        required: true,
        default: 'dinner'
    },
    image: {
        type: String,
        required: true,
        default: '/images/placeholder.jpg'
    },
    rating: {
        type: Number,
        required: true,
        default: 5
    },
    numReviews: {
        type: Number,
        required: true,
        default: 1
    },
    comments: [{
        //type: mongoose.Schema.Types.ObjectId,
        //ref: "Comment",
        //index: true,
        comment: {
            type: String,
            required: true,
            unique: false,
        },
        flags: {
            type: Number,
            required: true,
            default: 0,
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
        rating:{
            type: Number,
            required: false,
            default: 5
        },
        user: {
            type: String,
            required: true,
            unique: false,
        },


    }],
    timeToMake: {
        type: Number,
        required: true,
        default: 60
    },
    content: {
        type: String,
        required: true,
        index: true,
    },
    feeds: {
        type: Number,
        required: true,
        default: 1
    },
    dogSafe: {
        type: Boolean,
        required: false,
        default: false
    }

}, {timestamps: true, autoIndex: false})

recipeSchema.pre('validate', async function (next){
    this.slug = this.name.toLowerCase().replace(/ /g, '-')
    next()
    
})

recipeSchema.post('save', async function (next){
    this.slug = this.name.toLowerCase().replace(/ /g, '-')
    
})
const Recipe = mongoose.model("Recipe", recipeSchema)

Recipe.createIndexes()
export default Recipe