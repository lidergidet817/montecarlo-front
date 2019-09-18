import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

    const { user: {_id, name, email, role} } = isAuthenticated();    

    const adminLinks = () => {
        return (
            <div className="card">
                <h3 className="card-header">Menú de administración</h3>
                <ul className="list-group">                    
                    <li className="list-group-item">
                        <Link to="/create/category" className="nav-link">Crear Categorías</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/create/product" className="nav-link">Crear productos</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link">Ver Ordenes</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link">Administrar productos</Link>
                    </li>                    
                </ul>
            </div>            
        )
    }

    const adminInfo = () => {
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

    return (
        <Layout 
            title='Tablero principal - Administrador'
            description={`Dashboard | Montecarlo App versión Pelayo. Buenos días: ${name}`}
            classname="container col-md-8 offset-md-2"
        >
            <div className="row">
                <div className="col-4">
                    { adminLinks() }
                </div>
                <div className="col-8">
                    { adminInfo() }
                </div>                
            </div>
        </Layout>
    );
}

export default AdminDashboard;
