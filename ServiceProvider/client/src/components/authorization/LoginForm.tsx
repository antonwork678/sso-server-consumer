import React from 'react';
import {oathAPI} from "../../api/oath";


const LoginForm = () => {
    const [login, {}] = oathAPI.useLoginMutation()

    const oathLoginHandler = () => {
        login()
    }

    return (
        <>
            <h2>Login</h2>
            <div>
                <button onClick={oathLoginHandler}>Login with SSO</button>
            </div>
        </>
    );
};

export default LoginForm;