import { createSlice } from '@reduxjs/toolkit'

const channelBackgroundsSlice = createSlice({
  name: 'channelBackgrounds',
  initialState: {},
  reducers: {
    setChannelBackground: (state, action) => {
      const { channelId, backgroundIndex } = action.payload
      state[channelId] = backgroundIndex
    },
  },
})

export const { setChannelBackground } = channelBackgroundsSlice.actions
export default channelBackgroundsSlice.reducer
