import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signupUser } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    const { name, email, password, error, success } = values;

    const registrarUsuarioClick = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            error: false
        })
        signupUser({name, email, password})
        .then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    success: false
                });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        })
    }

    const showError = () => {
        return <div className="alert alert-danger" style={{ display: error ? '': 'none' }}>
            { error }
        </div>
    }

    const showSuccess = () => {
        return <div className="alert alert-info" style={{ display: success ? '': 'none' }}>
            El registro del usuario se ha creado con éxito, por favor inicie sesión.
            <Link to="/signin">Ir al inicio de sesión</Link>
        </div>
    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={ handleChange('name') }
                    value={ name }
                />
            </div>
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
            <button className="btn btn-primary" onClick={ registrarUsuarioClick } >
                Registrarse
            </button>         
        </form>
    )

    return (
        <Layout title='Home' description='Página principal' classname="container col-md-8 offset-md-2">            
            { /* imprimiendo en formato json el estado: */ }
            { /*JSON.stringify(values)*/ }

            { /* show messages */ }
            { showError() }
            { showSuccess() }
            { signupForm() }
        </Layout>        
    );
}

export default Signup;
