import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import {
    getProducts,
    deleteProduct
} from './ApiAdmin';

const ManageProducts = () => {

    const [products, setProducts] = useState([])
    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setProducts(data)
            }
        })
    }

    const destroyProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts();
            }
        })
    }

    useEffect(()=> {
        loadProducts();
    }, [])

    return (
        <Layout title='Productos' description='Administración de productos' classname='container'>            
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4">Gestionar productos/servicios de la plataforma</h2>
                    <h3 className="text-info">Actualmente, hay registrado un total de: { products.length } productos/servicios.</h3>
                    <hr />
                    <ul className="list-group">
                        {
                            products.map((prod, pIndex) => {
                                return (
                                    <li 
                                        key={ pIndex }
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <strong>{ prod.name }</strong>
                                        <Link to={`/admin/product/update/${prod._id}`}>
                                            <span className="badge badge-warning badge-pill">Actualizar</span>
                                        </Link>
                                        <span onClick={ ()=> {
                                            destroyProduct(prod._id)
                                        }} className="badge badge-danger badge-pill">
                                            Borrar
                                        </span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>                        
        </Layout>
    );
}

export default ManageProducts;
