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
        authValidateAction: (state, action: PayloadAction<void>) => {

        }
    }
})

export const {} = commonSlice.actions
export default commonSlice.reducer