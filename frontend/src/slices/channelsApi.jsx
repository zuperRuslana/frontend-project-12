import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../api/baseQuery'

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery,
  tagTypes: ['Channel'],
  endpoints: builder => ({
    fetchChannels: builder.query({
      query: () => '/channels',
      providesTags: [{ type: 'Channel', id: 'ALL' }],
    }),

    addChannel: builder.mutation({
      query: channel => ({
        url: '/channels',
        method: 'POST',
        body: channel,
      }),
    }),
    editChannel: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    removeChannel: builder.mutation({
      query: ({ id }) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})
export const {
  useFetchChannelsQuery,
  useEditChannelMutation,
  useRemoveChannelMutation,
  useAddChannelMutation,
} = channelsApi
