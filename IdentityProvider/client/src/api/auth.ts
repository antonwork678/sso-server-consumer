import {createApi} from "@reduxjs/toolkit/query/react";
import {TAuthUser} from "../types/user";
import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";

type TRegistrationResponse = {
    app_key: string
    public_key: string
}

type TLoginRequest = {
    email: string
    password: string
    serviceURL: string
}

type TRegistrationRequest = {
    name: string
    email: string
    password: string
    origin: string
    app_name: string
}

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env['REACT_APP_API_URL']}/auth`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        login: builder.mutation<any, TLoginRequest>({
            query: (loginData) => ({
                url: '/login',
                method: 'POST',
                body: loginData
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

        registration: builder.mutation<TRegistrationResponse, TRegistrationRequest>({
            query: (registrationData) => ({
                url: '/registration',
                method: 'POST',
                body: registrationData
            }),
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try{
                    const {data, meta} = await queryFulfilled
                } catch(e) {
                    console.log(e)
                }
            }
        })
    })
})