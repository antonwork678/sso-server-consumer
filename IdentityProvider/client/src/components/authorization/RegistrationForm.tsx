import React, {useState, ChangeEvent, MouseEvent, FC} from 'react';
import {authAPI} from "../../api/auth";

type TRegistrationFormState = {
    name: string
    app_name: string
    email: string
    password: string
    origin: string
}

const DefaultRegistrationFormState: TRegistrationFormState = {
    name: '',
    app_name: '',
    email: '',
    password: '',
    origin: ''
}

const RegistrationForm: FC = () => {
    const [state, setState] = useState<TRegistrationFormState>(DefaultRegistrationFormState)
    const [registrationAction, {data: registrationData, isSuccess, isError}] = authAPI.useRegistrationMutation()

    const changeField = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget?.name
        const value = e.currentTarget.value
        if (!name || !(name in state) || value === undefined) return;

        setState({...state, [e.currentTarget.name]: value})
    }

    const submit = (e: MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        registrationAction(state)
    }

    return (
        <>
            <h2>Register</h2>
            <form method="post" className="register">
                <p>
                    <label>Name <span className="required">*</span></label>
                    <input type="text" name="name" onChange={changeField} value={state.name} />
                </p>
                <p>
                    <label>Email <span className="required">*</span></label>
                    <input type="email" name="email" onChange={changeField} value={state.email} />
                </p>
                <p>
                    <label>Password <span className="required">*</span></label>
                    <input type="password" name="password" onChange={changeField} value={state.password} />
                </p>
                <p>
                    <label>App name <span className="required">*</span></label>
                    <input type="text" name="app_name" onChange={changeField} value={state.app_name} />
                </p>
                <p>
                    <label>App Origin <span className="required">*</span></label>
                    <input type="text" name="origin" onChange={changeField} value={state.origin} />
                </p>
                <p className="auth-submit">
                    <input type="submit" value="Register" onClick={submit} />
                </p>
                {isSuccess && <p>Your APP has been registered!</p>}
                {isError && <p>Error!</p>}
                {registrationData && <>
                    <div style={{marginBottom: '30px'}}>
                        <div>Public KEY:</div>
                        <div>{registrationData.public_key}</div>
                    </div>
                    <div>
                        <div>App token:</div>
                        <div>{registrationData.app_key}</div>
                    </div>
                </>}
            </form>
        </>
    );
};

export default RegistrationForm;