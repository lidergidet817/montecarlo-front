import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './ApiUser';
import moment from 'moment';

const UserDashboard = () => {

    const [history, setHistory] = useState([])

    const { user: {_id, name, email, role} } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log("from frontend PURCHASE-HISTORY", data)
                setHistory(data)
            }
        })
    }

    useEffect(()=> {
        init(_id, token);
    }, [])

    const userLinks = () => {
        return (
            <div className="card">
                <h3 className="card-header">Historial de compra</h3>
                <ul className="list-group">                    
                    <li className="list-group-item">
                        <Link to="/cart" className="nav-link">Mi carrito</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={`/profile/${_id}`} className="nav-link">Editar mi perfil</Link>
                    </li>                    
                </ul>
            </div>            
        )
    }

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Información del usuario</h3>
                <ul className="list-group">
                    <li className="list-group-item">Nombre {name}</li>
                    <li className="list-group-item">Correo {email}</li>
                    <li className="list-group-item">Rol { role === 1 ? 'Admin': 'Usuario registrado'} </li>
                </ul>
            </div>
        )
    }

    const purchaseHistory = (history) => {
        return (
            <div className="card">
                <h3 className="card-header">Historial de compra</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        { /*JSON.stringify(history)*/ }
                        {
                            history.map((his, hIndex) => {
                                return (
                                    <div>
                                        <hr />
                                        <span className="badge badge-primary mb-2">Detalles de la compra: </span>
                                        { his.products.map((prod, pIndex) => {
                                            return (
                                                <div key={pIndex}>
                                                    <h6>Nombre del producto/servicio: {prod.name}</h6>
                                                    <h6>Precio del producto/servicio: <span className="dollar">$</span>{prod.price}</h6>
                                                    <h6>Fecha de envío: { moment(prod.createdAt).fromNow() }</h6>
                                                </div>
                                            )
                                        }) }           
                                    </div>
                                )
                            })
                        }
                        <hr />

                    </li>
                </ul>
            </div>            
        )
    }

    return (
        <Layout 
            title='Tablero principal'
            description={`Dashboard | Montecarlo App versión Pelayo. Buenos días: ${name}`}
            classname="container col-md-8 offset-md-2"
        >
            <div className="row">
                <div className="col-3">
                    { userLinks() }
                </div>
                <div className="col-9">
                    { userInfo() }
                    { purchaseHistory(history) }
                </div>                
            </div>
        </Layout>
    );
}

export default UserDashboard;
