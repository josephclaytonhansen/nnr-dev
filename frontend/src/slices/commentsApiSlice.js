import { COMMENTS_URL } from "../constants"
import { apiSlice } from './apiSlice'

export const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation({
            query: (comment) => ({
                url: `${COMMENTS_URL}/create`,
                method: 'POST',
                body: comment,
            }),
        }),
    }),
})

export const {
    useCreateCommentMutation,
} = commentsApiSlice