import express from 'express'
const router = express.Router()

import {
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
} from '../controllers/recipeController.js'

router.route('/all').get(getRecipes)
router.route('/random').get(getRandomRecipe)
router.route('/tag/:tag').get(getRecipesByTag)
router.route('/cuisine/:cuisine').get(getRecipesByCuisine)
router.route('/source/:source').get(getRecipesBySource)
router.route('/author/:author').get(getRecipesByAuthor)
router.route('/:id').get(getRecipeById)
router.route('/slug/:slug').get(getRecipeBySlug)
router.route('/meal/:meal').get(getRecipesByMeal)
router.route('/').get(getRecipesRecent)
router.route('/ingredient/:ingredient').get(getRecipesByIngredient)
router.route('/gluten-free').get(getRecipesGlutenFree)
router.route('/vegetarian').get(getRecipesVegetarian)

export default router