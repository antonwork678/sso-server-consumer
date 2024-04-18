import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {authAPI} from "../../api/auth";

type TLoginFormState = {
    email: string
    password: string
}

const DefaultLoginFormState: TLoginFormState = {
    email: '',
    password: ''
}

const LoginForm = () => {
    const navigate = useNavigate()
    const [state, setState] = useState<TLoginFormState>(DefaultLoginFormState)
    const [loginAction, {isLoading, isSuccess}] = authAPI.useLoginMutation()
    const [getParams, setGetParams] = useSearchParams()

    useEffect(() => {
        isSuccess && navigate('/')
    }, [isSuccess])

    const changeField = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget?.name
        const value = e.currentTarget.value
        if (!name || !(name in state) || value === undefined) return;

        setState({...state, [e.currentTarget.name]: value})
    }

    const submit = (e: MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        loginAction({
            email: state.email,
            password: state.password,
            serviceURL: getParams.get('serviceURL') || ''
        })
    }

    return (
        <>
            <h2>Login</h2>
            <form method="post" className="login">
                <p>
                    <label>E-mail <span className="required">*</span></label>
                    <input type="text" name="email" value={state.email} onChange={changeField} />
                </p>
                <p>
                    <label>Password <span className="required">*</span></label>
                    <input type="password" name="password" value={state.password} onChange={changeField} />
                </p>
                <p className="auth-submit">
                    <input type="submit" value="Login" onClick={submit} />
                    <input type="checkbox" id="rememberme" value="forever" />
                    <label htmlFor="rememberme">Remember me</label>
                </p>
                <p className="auth-lost_password">
                    <a href="#">Lost your password?</a>
                </p>
            </form>
        </>
    );
};

export default LoginForm;