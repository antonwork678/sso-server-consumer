import React, {useEffect} from 'react';
import LoginForm from "./components/authorization/LoginForm";
import {useAppSelector} from "./store/hooks";
import UserInfo from "./components/UserInfo";
import {oathAPI} from "./api/oath";

function App() {
    const authUser = useAppSelector(state => state.common.authUser)
    oathAPI.useVerifyQuery()

    return (
        <div className="App">
            {authUser ? <UserInfo /> : <LoginForm />}
        </div>
    )
}

export default App;
