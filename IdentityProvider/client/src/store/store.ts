import {configureStore} from "@reduxjs/toolkit"
import commonReducer from "./reducers/commonSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authAPI} from "../api/auth";

export const store = configureStore({
    reducer: {
        common: commonReducer,
        [authAPI.reducerPath]: authAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authAPI.middleware
    )
})

store.getState()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)