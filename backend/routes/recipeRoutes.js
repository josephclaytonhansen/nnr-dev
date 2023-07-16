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
    getRecipesDogSafe,
    getRecipesBySearch,
    getRecipeBySlugPlainText
} from '../controllers/recipeController.js'

import {
    createRecipeById,
    deleteRecipeById,
    updateRecipeById,
} from '../controllers/admin/recipeController.js'

import Recipe from '../models/recipeModel.js'


//Admin routes (needs protect/admin middleware)
router.route('/').post(createRecipeById)
router.route('/id/:id').delete(deleteRecipeById)
router.route('/id/:id').put(updateRecipeById)

router.route('/create').post(
    //create a new Recipe and return the ID 
    (req, res, next) => {
        Recipe.create({
            author: req.body.author,
        }, function (err, recipe) {}).then(recipe => {
            if (err) {
                res.status(203).send('Error creating recipe')
            } else {
            res.status(200).send(recipe._id)
            }
        })
    }
)

//Public routes
router.route('/all').get(getRecipes)
router.route('/random').get(getRandomRecipe)
router.route('/tag/:tag').get(getRecipesByTag)
router.route('/cuisine/:cuisine').get(getRecipesByCuisine)
router.route('/source/:source').get(getRecipesBySource)
router.route('/author/:author').get(getRecipesByAuthor)
router.route('/:id').get(getRecipeById)
router.route('/slug/:slug').get(getRecipeBySlug)
router.route('/plain-text/:slug').get(getRecipeBySlugPlainText)
router.route('/meal/:meal').get(getRecipesByMeal)
router.route('/').get(getRecipesRecent)
router.route('/ingredient/:ingredient').get(getRecipesByIngredient)
router.route('/gf/gluten-free').get(getRecipesGlutenFree)
router.route('/v/vegetarian').get(getRecipesVegetarian)
router.route('/ds/dog-safe').get(getRecipesDogSafe)
router.route('/search/:search').get(getRecipesBySearch)

export default router