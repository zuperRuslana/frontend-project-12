import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    baseUrl:'/api/v1/channels',
    prepareHeaders: (headers, {getState})=> {
        const token = getState().auth.token
        if(token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})


export const channelsApi  = createApi({
reducerPath: 'channels',
baseQuery,
tagTypes: ['Channel'],
endpoints: builder => ({
    fetchChannels: builder.query({
        query: ()=> '',
        providesTags: [{ type: 'Channel', id: 'ALL' }]
    }),

    addChannel: builder.mutation({
        query: channel =>({
            method: 'POST',
            body: channel
        }),
        invalidatesTags: [{ type: 'Channel', id: 'ALL' }]
    }),
    editChannel: builder.mutation({
        query: ({id, ...body}) => ({
            url: id,
            method: 'PATCH',
            body
        }),
        invalidatesTags: [{ type: 'Channel', id: 'ALL' }]
    }),
    removeChannel: builder.mutation({
        query: ({id}) => ({
            url: id,
            method: 'DELETE',
        }),
        invalidatesTags: [{ type: 'Channel', id: 'ALL' }]
    })
})
})
export const {
    useFetchChannelsQuery,
    useEditChannelMutation,
    useRemoveChannelMutation,
    useAddChannelMutation
} = channelsApi


