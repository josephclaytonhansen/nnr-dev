import asyncHandler from '../../middleware/asyncHandler.js'
import Recipe from '../../models/recipeModel.js'


// @desc    Create recipe by id
// @route   POST /api/recipes/id/:id
// @access  Private/Admin
const createRecipeById = asyncHandler(async (req, res) => {
    const {
        name,
        ingredients,
        instructions,
        cuisine,
        tags,
        source,
        author,
        isGlutenFree,
        isVegetarian,
        meal,
        slug,
        image,
        rating,
        numReviews,
        comments,
        timeToMake,
        content,
    } = req.body
    const snlug = name.toLowerCase().replace(/ /g, '-')
    const recipeExists = await Recipe.findById(req.params.id)
    if (recipeExists) {
        res.status(400)
        throw new Error('Recipe already exists')
    } else {
        const recipe = await Recipe.create({
            name,
            ingredients,
            instructions,
            cuisine,
            tags,
            source,
            slug: snlug,
            author,
            isGlutenFree,
            isVegetarian,
            meal,
            image,
            rating,
            numReviews,
            comments,
            timeToMake,
            content,
        })
        if (recipe) {
            res.status(201).json({
                _id: recipe._id,
                name: recipe.name,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
                cuisine: recipe.cuisine,
                tags: recipe.tags,
                source: recipe.source,
                slug: recipe.slug,
                author: recipe.author,
                isGlutenFree: recipe.isGlutenFree,
                isVegetarian: recipe.isVegetarian,
                meal: recipe.meal,
                image: recipe.image,
                rating: recipe.rating,
                numReviews: recipe.numReviews,
                comments: recipe.comments,
                timeToMake: recipe.timeToMake,
                content: recipe.content,
            })
        } else {
            res.status(400)
            throw new Error('Invalid recipe data')
        }
    }
})

// @desc    Delete recipe by id
// @route   DELETE /api/recipes/id/:id
// @access  Private/Admin
const deleteRecipeById = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    if (recipe) {
        await recipe.deleteOne()
        res.json({message: 'Recipe removed'})
    } else {
        res.status(404)
        throw new Error('Recipe not found')
    }
})

// @desc    Update recipe by id
// @route   PUT /api/recipes/id/:id
// @access  Private/Admin
const updateRecipeById = asyncHandler(async (req, res) => {
    const {
        name,
        ingredients,
        instructions,
        cuisine,
        tags,
        source,
        author,
        isGlutenFree,
        dogSafe,
        feeds,
        isVegetarian,
        meal,
        image,
        rating,
        numReviews,
        comments,
        timeToMake,
        content,
    } = req.body
    const recipe = await Recipe.findById(req.params.id)
    if (recipe) {
        recipe.name = name
        recipe.ingredients = ingredients
        recipe.instructions = instructions
        recipe.cuisine = cuisine
        recipe.tags = tags
        recipe.source = source
        recipe.author = author
        recipe.isGlutenFree = isGlutenFree
        recipe.isVegetarian = isVegetarian
        recipe.dogSafe = dogSafe
        recipe.feeds = feeds
        recipe.meal = meal
        recipe.image = image
        recipe.rating = rating
        recipe.numReviews = numReviews
        recipe.comments = comments
        recipe.timeToMake = timeToMake
        recipe.content = content

        const updatedRecipe = await recipe.save()
        res.json({
            _id: updatedRecipe._id,
            name: updatedRecipe.name,
            ingredients: updatedRecipe.ingredients,
            instructions: updatedRecipe.instructions,
            cuisine: updatedRecipe.cuisine,
            tags: updatedRecipe.tags,
            source: updatedRecipe.source,
            slug: updatedRecipe.slug,
            author: updatedRecipe.author,
            isGlutenFree: updatedRecipe.isGlutenFree,
            isVegetarian: updatedRecipe.isVegetarian,
            dogSafe: updatedRecipe.dogSafe,
            meal: updatedRecipe.meal,
            feeds: updatedRecipe.feeds,
            image: updatedRecipe.image,
            rating: updatedRecipe.rating,
            numReviews: updatedRecipe.numReviews,
            comments: updatedRecipe.comments,
            timeToMake: updatedRecipe.timeToMake,
            content: updatedRecipe.content,
        })
    } else {
        res.status(404)
        throw new Error('Recipe not found')
    }
})

export {
    createRecipeById,
    deleteRecipeById,
    updateRecipeById,
}