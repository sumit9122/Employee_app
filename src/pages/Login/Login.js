import React, { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { postAPIData } from '../../utils/Index';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        let token = window.localStorage.token;
        if (token) {
            navigate("/");
        }
    }, [])

    const handleChange = (e) => {
        const setData = { ...loginData, [e.target.name]: e.target.value }
        setLoginData(setData);
    }
    const signUp = () => {
        const userError = validate(loginData);
        setLoginError(userError);
        if(Object.keys(userError).length > 0) return;

        postAPIData("/login", loginData).then(res => {
        
            window.localStorage.setItem("token", res.data.token);
            setTimeout(() => {
                navigate('/')
            }, 1000)

        }).catch(error => {
            console.log(error);
        })
    }
    const validate = (val) => {
        const errors = {};
        if (!val?.username) {
            errors.username = "username not be blank";
        }
        if (!val?.password) {
            errors.password = "password not be blank";
        }
        return errors;
    }
    return (
        <div>
            <div className='login'>
                <div className='login_box'>
                    <h2> Student Login </h2>
                    <div className='form_fields'>
                        <input type='text' name='username' onChange={handleChange} value={loginData.username} placeholder='Enter Username' />
                        {loginError.username && <span>{loginError.username}</span>}
                        <br />
                        <input type='password' name='password' onChange={handleChange} value={loginData.password} placeholder='Enter Your password' />
                        {loginError.password && <span>{loginError.password}</span>}
                        <button onClick={signUp}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login