import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { 
    getListOrders,
    getListStatusValues,
    updateOrderStatus
} from './ApiAdmin';
import moment from 'moment';

const OrdersComponent = () => {

    const [orders, setOrders] = useState([])
    const [statusValues, setStatusValues] = useState([])

    const { user, token} = isAuthenticated();

    // Trae las ordenes
    const loadOrders = () => {
        getListOrders(user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        })
    }

    // trae los estados de las ordenes
    const loadStatusValuesOrder = () => {
        getListStatusValues(user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setStatusValues(data);
            }
        })
    }    

    useEffect(()=> {
        loadOrders();
        loadStatusValuesOrder();
    }, [])

    // No orders
    const noOrders = orders => {
        return orders.length < 1 ? <h4>Sin ordenes registradas</h4>:null;
    }

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className="text-danger display-2">Total de ordenes: {orders.length}</h1>
            )
        } else {
            return <div className="text-danger">Sin ordenes a mostrar</div>
        }
    }


    const showInput = (key, value) => {
        return (
            <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                    <div className="input-group-text">{key}</div>
                </div>
                <input type="text" value={value} className="form-control" readOnly />
            </div>
        )
    }

    const handleStatusChange = (event, orderId) => {
        //
        updateOrderStatus(user._id, token, orderId, event.target.value)
        .then(data => {
            if(data.error) {
                console.log("el estado no se cambió en la plataforma,", data.error);
            }else{
                loadOrders();
            }
        })
    }

    const showStatusValues = (order) => {
        return (
            <div className="form-group">
                <h3 className="mark mb-4"> Estados: { order.status }</h3>
                <select className="form-control" onChange={ (e)=> {
                    handleStatusChange(e, order._id)
                }}>
                    <option>Actualizar estado</option>
                    { statusValues.map((status, index) => (
                        <option key={index} value={status} >{ status }</option>
                    )) }
                </select>
            </div>
        )
    }


    return (
        <Layout 
            title='Ordenes registradas en la plataforma'
            description={`Hola ${user.name}, acá podrás administrar todas tus órdenes`}
            classname="container"
        >
            <div className="row">
                <div className="col-8 offset-md-2">
                    { showOrdersLength() }
                    { orders.map((order, oIndex)=>{
                        return (
                            <div className="mt-5" key={oIndex} style={{ borderBottom: "5px solid indigo" }}>
                                <h2 className="mb-5">
                                    <span className="bg-primary">Id de la orden: { order._id }</span>
                                </h2>
                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        { showStatusValues(order) }
                                    </li>
                                    <li className="list-group-item">
                                        Id de la transacción: { order.transaction_id }
                                    </li>
                                    <li className="list-group-item">
                                        Cantidad total: <span className="dollar"></span>{ order.amount }
                                    </li>                                                                        
                                    <li className="list-group-item">
                                        Ordenado por: { order.user.name }
                                    </li>      
                                    <li className="list-group-item">
                                        Ordenado en: { moment(order.createdAt).fromNow() }
                                    </li>
                                    <li className="list-group-item">
                                        Dirección de entrega: { order.address }
                                    </li>                                    
                                </ul>

                                <h3 className="mt-4 mb-4 font-italic">
                                    Total de productos asociados con la orden: { order.products.length }
                                </h3>

                                { order.products.map((prod, pIndex) => (
                                    <div className="mb-4" key={pIndex} style={{ padding: "20px", border: "1px solid indigo" }}>
                                        { showInput('Nombre del producto', prod.name) }
                                        { showInput('Precio del producto', prod.price) }
                                        { showInput('Total del producto', prod.count) }
                                        { showInput('Código del producto', prod._id) }
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>                
            </div>
        </Layout>
    );
}

export default OrdersComponent;




