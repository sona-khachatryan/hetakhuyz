import './adminSignIn.style.scss';
import {useEffect, useState} from 'react';
import axios from "../interceptor.js";

function AdminSignIn({setIsAuthenticated}) {
    const [usernameInputValue, setUsernameInputValue] = useState();
    const [passwordInputValue, setPasswordInputValue] = useState();
    const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if(usernameInputValue && passwordInputValue) {
            setSubmitIsDisabled(false);
        } else {
            setSubmitIsDisabled(true);
        }
    }, [usernameInputValue, passwordInputValue]);

    useEffect(() => {
        let timeoutId;
        if(error) {
            timeoutId = setTimeout(() => setError(false), 5000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/admin/login',{
            email: usernameInputValue,
            password: passwordInputValue,
        })
            .then(({data}) => {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setIsAuthenticated(true);
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            })
    }

    return (
        <div className='adminSignIn container'>
            <p className='adminSignIn_heading'>Մուտք գործել</p>
            <form className='adminSignIn_form' onSubmit={handleSubmit}>
                <div className='adminSignIn_input-container'>
                    <label>Մուտքանուն</label>
                    <input
                        id='username'
                        type='text'
                        value={usernameInputValue}
                        onChange={(e) => setUsernameInputValue(e.target.value)}
                    />
                </div>
                <div className='adminSignIn_input-container'>
                    <label>Գաղտնաբառ</label>
                    <input
                        id='password'
                        type='password'
                        autoComplete='on'
                        value={passwordInputValue}
                        onChange={(e) => setPasswordInputValue(e.target.value)}
                    />
                    {error ? <p>Անվավեր տվյալներ</p> : <p></p>}
                </div>
                {/*<div className='adminSignIn_bottom-section'>*/}
                {/*    <div>*/}
                {/*        <input type='checkbox'/>*/}
                {/*        <span>Հիշել ինձ</span>*/}
                {/*    </div>*/}
                {/*    <p>Մոռացե՞լ եք գաղտնաբառը</p>*/}
                {/*</div>*/}
                <button
                    type='submit'
                    disabled={submitIsDisabled}
                    className={submitIsDisabled ? 'submit-disabled' : ''}>
                    Մուտք
                </button>
            </form>
        </div>
    );
}

export default AdminSignIn;