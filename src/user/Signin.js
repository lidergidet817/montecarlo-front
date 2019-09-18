import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signinUser, authenticate, isAuthenticated } from '../auth';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
        loginStatusFlag: false
    });

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    const { email, password, error, loading, redirectToReferrer, loginStatusFlag } = values;
    const { user } = isAuthenticated();

    const iniciarSesionClick = (event) => {
        event.preventDefault();        
        setValues({
            ...values,
            error: false,
            loading: true
        })

        signinUser({email, password})
        .then(data => {
            console.log("error::: ", data.error)
            if (!data.loginStatus) {
                setValues({
                    ...values,
                    error: data.error,
                    loading: false,
                    redirectToReferrer: false,
                    loginStatusFlag: false
                });
            } else {
                authenticate(data, ()=> {
                    setValues({
                        ...values,
                        redirectToReferrer: true,
                        loading: true,
                        loginStatusFlag: true
                    });
                });
            }
        })
    }

    const showError = () => {
        return <div className="alert alert-danger" style={{ display: error ? '': 'none' }}>
            { error }
        </div>
    }

    const showLoading = () => {
        return loading && (<div className="alert alert-info">Loading...</div>);
    }

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="user/dashboard" />
            }            
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }        
    }

    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    onChange={ handleChange('email') }
                    value={ email }
                />
            </div>            
            <div className="form-group">
                <label className="text-muted">Contraseña</label>
                <input 
                    type="password" 
                    className="form-control" 
                    onChange={ handleChange('password') }
                    value={ password }
                />
            </div>   
            <button className="btn btn-primary" onClick={ iniciarSesionClick } >
                Iniciar sesión
            </button>
        </form>
    )

    return (
        <Layout title='Inicio de sesión' description='Autenticarse en la plataforma' classname="container col-md-8 offset-md-2">            
            { /* imprimiendo en formato json el estado: */ }
            { /*JSON.stringify(values)*/ }

            { /* show messages */ }
            { showLoading() }
            { showError() }            
            { signinForm() }
            { redirectUser() }
        </Layout>        
    );
}

export default Signin;
