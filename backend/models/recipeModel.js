import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    ingredients: [{
        name: {
            type: String,
            required: true
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
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    source: {
        type: String,
        required: false
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    timeToMake: {
        type: Number,
        required: true,
        default: 60
    },
    content: {
        type: String,
        required: true,
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

}, {timestamps: true, autoIndex: true})

recipeSchema.index({name: 'text', content: 'text', tags: 'text', ingredients: 'text', instructions: 'text', cuisine: 'text', author: 'text', source: 'text', meal: 'text', slug: 'text'})

recipeSchema.pre('validate', async function (next){
    this.slug = this.name.toLowerCase().replace(/ /g, '-')
    next()
    
})

recipeSchema.post('save', async function (next){
    this.slug = this.name.toLowerCase().replace(/ /g, '-')
    next()
    
})


const Recipe = mongoose.model("Recipe", recipeSchema)
Recipe.createIndexes()
export default Recipe