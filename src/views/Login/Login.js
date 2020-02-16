import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { fetchLoginRequest } from '../../redux/modules/auth/actions'

import '../../scss/Login.scss';
import logo from "../../img/logo1.png"

const LoginSchema = yup.object().shape({
    login: yup.string().required().email(),
    password: yup.string().required().min(8),
});

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, handleSubmit, errors, getValues } = useForm({
        validationSchema: LoginSchema
    });

    const dispatch = useDispatch();

    const handlerLogin = (e) => {
        e.preventDefault();

        dispatch(fetchLoginRequest({ email, password }))
    }

    return (
        <section data-testid='section-wrapper-login' className='login'>
            <div className='container login-wrapper'>
                <img className='logo' src={logo} alt=""></img>
                <div className="form">
                    <h1>Войти</h1>
                    <span>Новый пользоватей?</span>
                    <Link data-testid='registration' to='/registration' id='linkToReg'>Зарегистрируйтесь</Link>
                    <form onSubmit={handlerLogin}>
                        <label>Имя пользователя*
                        <input data-testid='name' type='text' name='login' ref={register} onChange={(e) => setEmail(e.target.value)} />
                            {errors.login && <p>{errors.login.message}</p>}
                        </label>
                        <label>Пароль*
                        <input data-testid='password' type='password' name='password' ref={register} onChange={(e) => setPassword(e.target.value)} />
                            {errors.password && <p>{errors.password.message}</p>}
                        </label>
                        <div>
                            <input data-testid='btn-submit' className='btn' type="submit" value='Войти' />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;