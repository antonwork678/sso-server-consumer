import {createApi} from "@reduxjs/toolkit/query/react";
import {setAuthUserAction} from "../store/reducers/commonSlice"
import {TAuthUser} from "../types/user";
import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const oathAPI = createApi({
    reducerPath: 'oathAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env['REACT_APP_API_URL']}/oath`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        login: builder.mutation<void, void>({
            query: () => ({
                url: '/login',
                method: 'GET'
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try{
                    const {data, meta} = await queryFulfilled

                } catch(e) {
                    const err = (e as any)
                    if (err.error?.status === 302) {
                        window.location = (err.error.data as any).url
                    }
                }
            }
        }),

        verify: builder.query<{user: TAuthUser}, void>({
            query: () => ({
                url: '/verify',
                method: 'POST'
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try{
                    const {data} = await queryFulfilled
                    if (data && data.user) {
                        dispatch(setAuthUserAction(data.user))
                    }

                } catch(e) {
                    const err = (e as any)
                    if (err.error?.status === 302) {
                        window.location = (err.error.data as any).url
                    }
                }
            }
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST'
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                await queryFulfilled
                dispatch(setAuthUserAction(null))
            }
        }),
    })
})