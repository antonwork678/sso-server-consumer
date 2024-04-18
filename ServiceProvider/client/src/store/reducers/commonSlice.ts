import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {TAuthUser} from "../../types/user";

export type TCommonState = {
    authUser: TAuthUser | null
    isLoading: boolean
}

const initialState: TCommonState = {
    authUser: null,
    isLoading: false
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setAuthUserAction: (state, action: PayloadAction<TAuthUser | null>) => {
            state.authUser = action.payload
        },
        setLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    }
})

export const {setAuthUserAction, setLoadingAction} = commonSlice.actions
export default commonSlice.reducer