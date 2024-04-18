import React from 'react';
import {useAppSelector} from "../store/hooks";
import {TAuthUser} from "../types/user";
import {oathAPI} from "../api/oath";

const UserInfo = () => {
    const [logout, {}] = oathAPI.useLogoutMutation()
    const authUser: TAuthUser | null = useAppSelector(state => state.common.authUser)
    if (!authUser) return <></>

    const logoutHandler = () => {
        logout()
    }

    return (
        <div>
            {Object.keys(authUser).map((key: string) => <div key={key}>
                <b>{key}: </b><span>{authUser[key as keyof TAuthUser]}</span>
            </div>)}
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
};

export default UserInfo;