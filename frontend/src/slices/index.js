import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authentificationSlice'
import {channelsApi} from './channelsApi'
import {messagesApi} from './messagesApi'
import channelBackgroundsReducer from './channelBackgroundsSlice'

export default configureStore({
    reducer: {
    auth: authReducer,
    channelBackgrounds: channelBackgroundsReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            channelsApi.middleware,
            messagesApi.middleware
        )
})
