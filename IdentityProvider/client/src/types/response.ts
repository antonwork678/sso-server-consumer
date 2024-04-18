import {TAuthUser} from "./user";

export type TAuth = {
    user: TAuthUser
    access: string
    refresh: string
}