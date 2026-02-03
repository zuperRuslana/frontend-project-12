import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    clickedChannel: null,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        clickedChannel(state, {payload}){
            state.clickedChannel = payload
        }
    }
})
export default uiSlice.reducer
export const { actions } = uiSlice