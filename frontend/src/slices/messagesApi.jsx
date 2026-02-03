import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../api/baseQuery'

export const messagesApi  = createApi({
reducerPath: 'messages',
baseQuery,
tagTypes: ['Message'],
endpoints: builder => ({
    fetchMessages: builder.query({
        query: ()=> '/messages',
        providesTags: [{type: 'Message', id: 'ALL'}]
    }),

    addMessage: builder.mutation({
        query: (message) =>({
            url: '/messages',
            method: 'POST',
            body: message
        }),
        invalidatesTags: [{ type: 'Message', id: 'ALL' }]
    }),
    editMessage: builder.mutation({
        query: ({id, ...body}) => ({
            url: `/messages/${id}`,
            method: 'PATCH',
            body
        }),
        invalidatesTags: [{ type: 'Message', id: 'ALL' }]
    }),
    removeMessage: builder.mutation({
        query: ({id}) => ({
            url: `/messages/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: [{ type: 'Message', id: 'ALL' }]
    })
})
})
export const {
    useFetchMessagesQuery,
    useAddMessageMutation,
    useEditMessageMutation,
    useRemoveMessageMutation
} = messagesApi


