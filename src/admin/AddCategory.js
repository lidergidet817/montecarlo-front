import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { CreateCategory } from './ApiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [errorDetail, setErrorDetail] = useState('')
    const [success, setsuccess] = useState(false)

    // Destructurando el usuario y token desde localstorage
    const { user, token }  = isAuthenticated();    

    // eventos
    const handleChange = (event) => {
        setError('')
        setErrorDetail('')
        setName(event.target.value)
    }

    const clickSubmitCategory = (e) => {
        e.preventDefault();
        setError('')
        setsuccess(false)
        // make request to api to create category
        CreateCategory( user._id, token, { name})
        .then(data => {
            if (data.error) {
                setErrorDetail(data.error)
                setError(true)
            } else {
                setError('')
                setErrorDetail('')
                setsuccess(true)
            }
        })
    }

    const newCategoryForm = () => (
        <form onSubmit={ clickSubmitCategory } >
            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={ handleChange } 
                    value={ name }
                    autoFocus
                    required
                />                
            </div>
            <button className="btn btn-outline-primary">Crear categoría</button>                 
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{ name } ha sido creada</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3 className="alert alert-danger">{ name } El nombre de la categoría debe ser único, este nombre ya se encuentra registrado en la plataforma.
                <br /><hr /> 
                <small>detalles técnicos del error:</small>
                <small>{ errorDetail }</small>
            </h3>
        }
    }

    const goBackDashboardAdmin = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="text-warning">
                    Ir a la Dashboard
                </Link>
            </div>
        )
    }

    return (
        <Layout 
            title='Tablero principal - Administrador'
            description={`Hola ${user.name}, bienvenido a esta sección | Crear nueva categoría`}
            classname="container"
        >
            <div className="row">
                <div className="col-8 offset-md-2">
                    { showSuccess() }
                    { showError() }
                    { newCategoryForm() }
                    { goBackDashboardAdmin() }
                </div>                
            </div>
        </Layout>
    );
}

export default AddCategory;
