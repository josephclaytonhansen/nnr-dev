import { RECIPES_URL } from "../constants"
import { apiSlice } from './apiSlice'

export const recipesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: () => ({
                url: RECIPES_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getRecipeById: builder.query({
            query: (recipeId) => ({
                url: `${RECIPES_URL}/${recipeId}`,
            }), keepUnusedDataFor: 10,
        }),
        getRecipeBySlug: builder.query({
            query: (slug) => ({
                url: `${RECIPES_URL}/slug/${slug}`,
            }), keepUnusedDataFor: 5,
        }),
        getRecipesByTag: builder.query({
            query: (tag) => ({
                url: `${RECIPES_URL}/tag/${tag}`,
            }), keepUnusedDataFor: 5,
        }),
        getRecipesByCuisine: builder.query({
            query: (cuisine) => ({
                url: `${RECIPES_URL}/cuisine/${cuisine}`,
            }), keepUnusedDataFor: 5,
        }),
        getRandomRecipe: builder.query({
            query: () => ({
                url: `${RECIPES_URL}/random`,
            }), keepUnusedDataFor: 5,
        }),
        getRecipesBySource: builder.query({
            query: (source) => ({
                url: `${RECIPES_URL}/source/${source}`,
            }), keepUnusedDataFor: 5,
        }),
        getRecipesByAuthor: builder.query({
            query: (author) => ({
                url: `${RECIPES_URL}/author/${author}`,
            }), keepUnusedDataFor: 5,
        }),
        getRecipesByMeal: builder.query({
            query: (meal) => ({
                url: `${RECIPES_URL}/meal/${meal}`,
            }), keepUnusedDataFor: 5,
        }),
        getRecipesRecent: builder.query({
            query: () => ({
                url: `${RECIPES_URL}/recent`,
            }), keepUnusedDataFor: 5,
        }),
        getRecipesByIngredient: builder.query({
            query: (ingredient) => ({
                url: `${RECIPES_URL}/ingredient/${ingredient}`,
            }), keepUnusedDataFor: 5,
        }),
        getRecipesGlutenFree: builder.query({
            query: () => ({
                url: `${RECIPES_URL}/gluten-free`,
            }), keepUnusedDataFor: 5,
        }),
        getRecipesVegetarian: builder.query({
            query: () => ({
                url: `${RECIPES_URL}/vegetarian`,
            }), keepUnusedDataFor: 5,
        }),
        updateRecipe: builder.mutation({
            query: ({id, data}) => ({
                url: `${RECIPES_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteRecipe: builder.mutation({
            query: (id) => ({
                url: `${RECIPES_URL}/${id}`,
                method: 'DELETE',
            }), 
        }),
        createRecipe: builder.mutation({
            query: (data) => ({
                url: `${RECIPES_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const { 
    useGetRecipesQuery,
    useGetRecipeByIdQuery,
    useGetRecipeBySlugQuery,
    useGetRecipesByTagQuery,
    useGetRecipesByCuisineQuery,
    useGetRandomRecipeQuery,
    useGetRecipesBySourceQuery,
    useGetRecipesByAuthorQuery,
    useGetRecipesByMealQuery,
    useGetRecipesRecentQuery,
    useGetRecipesByIngredientQuery,
    useGetRecipesGlutenFreeQuery,
    useGetRecipesVegetarianQuery,
    useUpdateRecipeMutation,
 } = recipesApiSlice