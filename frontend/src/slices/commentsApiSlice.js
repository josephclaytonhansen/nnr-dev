import { COMMENTS_URL } from "../constants"
import { apiSlice } from './apiSlice'

export const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: (comment) => ({
                url: `${COMMENTS_URL}/`,
                method: 'POST',
                body: comment,
            }),
        }),
        getCommentsByRecipe: builder.query({
            query: (recipeId) => `${COMMENTS_URL}/${recipeId}`,
            method: 'GET',
        }, {keepUnusedDataFor: 5}),

        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `${COMMENTS_URL}/${commentId}`,
                method: 'DELETE',
            }),
        }),
        updateComment: builder.mutation({
            query: ({ commentId, comment }) => ({
                url: `${COMMENTS_URL}/${commentId}`,
                method: 'PUT',
                body: comment,
            }),
        }),
        flagComment: builder.mutation({
            query: (commentId) => ({
                url: `${COMMENTS_URL}/flag/${commentId}`,
                method: 'PUT',
            }),
        }),
        togglePendingComment: builder.mutation({
            query: (commentId) => ({
                url: `${COMMENTS_URL}/pending/${commentId}`,
                method: 'PUT',
            }),
        }),
    }),
})

export const {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation,
    useFlagCommentMutation,
    useTogglePendingCommentMutation,
    useGetCommentsByRecipeQuery,
} = commentsApiSlice