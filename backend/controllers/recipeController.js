import asyncHandler from '../middleware/asyncHandler.js'
import Recipe from '../models/recipeModel.js'

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({})
    res.json(recipes)
})

// @desc    Get recipe by id
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)

    if (recipe) {
        res.json(recipe)
    } else {
        res.status(404)
        throw new Error('Recipe not found')
    }
})

// @desc    Get recipe by slug
// @route   GET /api/recipes/:slug
// @access  Public
const getRecipeBySlug = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findOne({slug: {$eq: req.params.slug}})

    if (recipe) {
        res.json(recipe)
    } else {
        res.status(404)
        throw new Error('Recipe not found')
    }
})

// @desc    Get recipes by tag
// @route   GET /api/recipes/tag/:tag
// @access  Public
const getRecipesByTag = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({tags: req.params.tag})

    if (recipes) {
        res.json(recipes)
    } else {
        res.status(404)
        throw new Error('Recipes not found')
    }
})

// @desc    Get recipes by cuisine
// @route   GET /api/recipes/cuisine/:cuisine
// @access  Public
const getRecipesByCuisine = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({cuisine: req.params.cuisine})

    if (recipes) {
        res.json(recipes)
    } else {
        res.status(404)
        throw new Error('Recipes not found')
    }
})

// @desc    Get recipes by meal
// @route   GET /api/recipes/meal/:meal
// @access  Public
const getRecipesByMeal = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({meal: req.params.meal})

    if (recipes) {
        res.json(recipes)
    } else {
        res.status(404)
        throw new Error('Recipes not found')
    }
})

// @desc    Get recipes by source
// @route   GET /api/recipes/source/:source
// @access  Public
const getRecipesBySource = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({source: req.params.source})

    if (recipes) {
        res.json(recipes)
    } else {
        res.status(404)
        throw new Error('Recipes not found')
    }
})


// @desc    Get recipes by author
// @route   GET /api/recipes/author/:author
// @access  Public
const getRecipesByAuthor = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({author: req.params.author})

    if (recipes) {
        res.json(recipes)
    } else {
        res.status(404)
        throw new Error('Recipes not found')
    }
})

// @desc    Get random recipe
// @route   GET /api/recipes/random
// @access  Public
const getRandomRecipe = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({})
    if (recipes) {
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]
        res.json(randomRecipe)
    } else {
        res.status(404)
        throw new Error('Recipes not found')
    }
})

// @desc    Get 6 recent recipes
// @route   GET /api/recipes/recent
// @access  Public
const getRecipesRecent = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({}).sort({createdAt: -1}).limit(6)
    if (recipes) {
        res.json(recipes)
    } else {
        res.status(404)
        throw new Error('Recipes not found')
    }
})

// @desc    Get recipes by ingredient
// @route   GET /api/recipes/ingredient/:ingredient
// @access  Public
const getRecipesByIngredient = asyncHandler(async (req, res) => {
    const i = {name: req.params.ingredient}
    console.log(i)
    //get recipes where i.name is in ingredients.name and ingredients is an array
    const recipes = await Recipe.find({ingredients: {$elemMatch: i}})

    if (recipes) {
        res.json(recipes)
    } else {
        res.status(404)
        throw new Error('Recipes not found')
    }
})

// @desc    Get gluten free recipes
// @route   GET /api/recipes/glutenfree
// @access  Public
const getRecipesGlutenFree = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({glutenFree: true})

    if (recipes) {
        res.json(recipes)
    } else {
        res.status(404)
        throw new Error('Recipes not found')
    }
})

// @desc    Get vegetarian recipes
// @route   GET /api/recipes/vegetarian
// @access  Public
const getRecipesVegetarian = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find({vegetarian: true})

    if (recipes) {
        res.json(recipes)
    } else {
        res.status(404)
        throw new Error('Recipes not found')
    }
})


export {
    getRecipes,
    getRecipeById,
    getRecipesByTag,
    getRecipesByCuisine,
    getRandomRecipe,
    getRecipesBySource,
    getRecipesByAuthor,
    getRecipeBySlug,
    getRecipesByMeal,
    getRecipesRecent,
    getRecipesByIngredient,
    getRecipesGlutenFree,
    getRecipesVegetarian,
}