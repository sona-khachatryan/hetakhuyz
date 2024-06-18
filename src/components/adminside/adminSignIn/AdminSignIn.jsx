import './adminSignIn.style.scss';
import React, {useState} from 'react';

function AdminSignIn(props) {
    const [usernameInputValue, setUsernameInputValue] = useState();
    const [passwordInputValue, setPasswordInputValue] = useState();

    return (
        <div className='adminSignIn container'>
            <p className='adminSignIn_heading'>Մուտք գործել</p>
            <form className='adminSignIn_form'>
                <div className='adminSignIn_input-container'>
                    <label>Մուտքանուն</label>
                    <input id='username' type='text'/>
                    <p>Սխալ մուտքանուն</p>
                </div>
                <div className='adminSignIn_input-container'>
                    <label>Գաղտնաբառ</label>
                    <input id='password' type='password' autoComplete='on'/>
                    <p>Սխալ գաղտնաբառ</p>
                </div>
                <div className='adminSignIn_bottom-section'>
                    <div>
                        <input type='checkbox'/>
                        <span>Հիշել ինձ</span>
                    </div>
                    <p>Մոռացե՞լ եք գաղտնաբառը</p>
                </div>
                <button type='submit'>Մուտք</button>
            </form>
        </div>
    );
}

export default AdminSignIn;