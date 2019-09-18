import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOut, isAuthenticated } from '../auth';
import { getTotalItemsLS } from './helpers/CartHelpers';

const isActive = (history, path) => {
    if (history.location.pathname === path){
        return { color: '#ff9900'}
    } else {
        return { color: '#ffffff'}
    }
}

const Menu = (props) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" to="/" style={ isActive(props.history, '/') }>Home</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/shop" style={ isActive(props.history, '/shop') }>Shop</Link>
                </li>

                { /* CART */ }
                <li className="nav-item">
                    <Link className="nav-link" to="/cart" style={ isActive(props.history, '/cart') }>
                        Carrito
                        <sup>
                            <span className="cart-badge">{ getTotalItemsLS() }</span>
                        </sup>
                    </Link>
                </li>                

                { !isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signin" style={ isActive(props.history, '/signin') }>Iniciar sesión</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" style={ isActive(props.history, '/signup') }>Registrarse</Link>
                        </li>
                    </Fragment>
                )}

                { isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={ isActive(props.history, '/user/dashboard') }
                            to="/user/dashboard"
                        >
                            Dashboard
                        </Link>
                    </li>                     
                )}


                { isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={ isActive(props.history, '/admin/dashboard') }
                            to="/admin/dashboard"
                        >
                            Dashboard (admin)
                        </Link>
                    </li>                     
                )}                

                { isAuthenticated() && (
                    <Fragment>                   
                        <li className="nav-item">
                            <span 
                                className="nav-link"
                                style={{ cursor: 'pointer', color: '#ffffff' }}
                                onClick={ ()=> signOut(()=> {
                                    props.history.push("/")
                                }) }
                            >
                                Cerrar sesión
                            </span>
                        </li>                                      
                    </Fragment>
                )}
            </ul>
        </div>
    );
}

export default withRouter(Menu);


