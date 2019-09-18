import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { 
    reaadProfile,
    updateProfile,
    updateUser

 }from './ApiUser';

const Profile = (props) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const { token } = isAuthenticated();

    const {name, email, password, error, success} = values;

    const init = (userId) => {
        reaadProfile(userId, token)
        .then(data => {
            if(data.error) {
                console.log(error)
                setValues({ ...values, error: true })
            }else{
                setValues({ ...values,name: data.name, email: data.email })
            }

        })
    }

    useEffect(()=> {
        init(props.match.params.userId);
    }, []);

    const handleChange = name =>  e =>{
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        updateProfile(props.match.params.userId, token, {
            name, email, password
        }).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                // actualizar DATOS - JWT
                updateUser(data, ()=> {
                    setValues({
                        ...values, name: data.name, email: data.email, success: true
                    })
                })
            }
        })
    }


    const redirectUser = (success) => {
        if(success) {
            return <Redirect to="/cart" />
        }
    }


    const profileUpdate = (name, email, password) => {
        return (
            <form>
                <div className="form-group">
                    <label className="text-muted">Nombre</label>
                    <input type="text" onChange={ handleChange('name') } className="form-control" value={ name }/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Correo electrónico</label>
                    <input type="email" onChange={ handleChange('email') } className="form-control" value={ email }/>
                </div>

                <div className="form-group">
                    <label className="text-muted">Contraseña</label>
                    <input type="password" onChange={ handleChange('password') } className="form-control" value={ password }/>
                </div>
                <button onClick={ clickSubmit } className="btn btn-primary">Actualizar</button>
            </form>
        )
    }

    return (
        <Layout 
            title='Tablero principal - Perfil del usuario'
            description={`Dashboard | Montecarlo App versión Pelayo. Buenos días: ${name}, acá podrás actualizar la información del perfil.`}
            classname="container col-md-8 offset-md-2"
        >
            <div className="row">
                <div className="col-6 m-auto">
                    <h2>Actualizar perfil de usuario</h2>
                    { profileUpdate(name, email, password) }
                    { redirectUser(success) }
                </div>
            </div>
        </Layout>
    );
}

export default Profile;
