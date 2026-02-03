import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            const {user, token} = action.payload
            state.user = user;
            state.token = token;
        },
        logOut(state) {
            state.user = null
            state.token = null
        }
    }
})
export default authSlice.reducer
export const { actions } = authSlice