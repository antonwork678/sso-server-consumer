import {configureStore} from "@reduxjs/toolkit"
import commonReducer from "./reducers/commonSlice";
import {setupListeners} from "@reduxjs/toolkit/query";
import {oathAPI} from "../api/oath";

export const store = configureStore({
    reducer: {
        common: commonReducer,
        [oathAPI.reducerPath]: oathAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        oathAPI.middleware
    )
})

store.getState()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)