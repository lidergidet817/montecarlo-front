import React, {useState, useEffect} from 'react';
import Layout from '../../core/Layout';
import { emptyCartLS } from '../helpers/CartHelpers';
import Card from '../../core/Card';
import { Link } from 'react-router-dom';
// Auth component
import { isAuthenticated } from '../../auth';
// BrainTree
import { 
    getBrainTreeClientToken,
    processPayment,
    createOrderService
} from '../ApiCore';
import 'braintree-web';
import DropIn from 'braintree-web-drop-in-react';



const Checkout = ({
    products,
    setRun = fn => fn, // valor por defecto para la función
    run = undefined // valor por defecto
}) => {

    const [data, setData] = useState({
        success: false,
        successBuy: false,
        clientToken: null,
        error: '',
        instance:{},
        address: '',
        loading: false
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    { /* GET TOKEN */ }
    const getToken = (userId, token) => {
        getBrainTreeClientToken(userId, token)
        .then(data => {
            if(data.error){
                setData({ ...data, error: data.error })
            }else{
                setData({ ...data, clientToken: data.clientToken })
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(()=>{
        getToken(userId, token);
    }, [])

    const handleAddress = (event) => {
        setData({...data, address: event.target.value})
    }

    const getTotalProduct = () => {
        // funcion reductora
        return products.reduce((currentValue, nextValue)=> {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    }

    const showActionsCheckout = () => {
        return(
            isAuthenticated() ?
            (
                <div className="">{ showDropIn() }</div>
            ):(
                <Link to="/signin">
                    <button className="btn btn-primary">Sign in to checkout</button>
                </Link>                    
            )            
        )
    }


    let deliveryAddress = data.address;


    const buyAction = () => {

        // sefinir estados generales
        setData({ loading: true })

        // send the nonce to your server

        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            console.log(data)
            nonce = data.nonce
            // once you have nonce (card, type, card number) send nonce as 'paymentMethodName'
            console.log('send nonce and total to process:', nonce, getTotalProduct())

            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotalProduct(products)
            }

            // Haciendo uso del servicio
            processPayment(userId, token, paymentData)
            .then(response => {
                console.log('respuesta::: desde checkout - buy succes: ', response.success);
                console.log('respuesta::: desde checkout - buy ', response);          

            
                    // función de devolución de llamada
                    // ************ CREANDO ORDEN ********************
                    const createOrderData = {
                        products: products,
                        transaction_id: response.transaction_id,
                        amount: response.transaction.amount,
                        address: deliveryAddress
                    }

                    createOrderService(userId, token, createOrderData)
                    .then(response => {

                        // empty cart
                        emptyCartLS(()=> { 
                            setData({ ...data, successBuy: true, success: true, loading: false})
                            // ************ VACIANDO EL CARRITO **************
                            if (response.success === true) {
                                //setData({ ...data, successBuy: response.success, loading: false})
                            }else{
                                //setData({ ...data, successBuy: false, loading: false})
                            }                      
                            setRun(!run);
                            console.log('payment success and empty cart, data::: ', data);
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    })
                
            })
            .catch(error => {
                console.log(error)
                setData({ loading: false })
            })
        })
        .catch(error => {
            console.log('dropIn error: ', error)
            setData({ ...data, error: error.message})
        })
    }

    const showDropIn = () => {
        return (
            <div onBlur={ ()=>setData({ ...data, error:"" }) }>
                { data.clientToken !== null && products.length > 0 ? (
                    <div>
                        <div className="form-group mb-3">
                            <label className="text-muted">Delivery address:</label>                            
                            <textarea 
                                onChange={handleAddress}
                                className="form-control"
                                value={data.address}
                                placeholder="Type your delivery address here..."
                            />
                        </div>
                        <DropIn options={{
                            authorization: data.clientToken,
                            paypal: {
                                mode: "sandbox",
                                flow: "vault"
                            }
                        }} onInstance={ instance => (data.instance = instance) }/>
                        <button className="btn btn-success btn-block" onClick={ buyAction }>Pagar</button>
                    </div>
                ): null}
            </div>
        )
    }
    
    { /* MENSAJES DE SUCCESS Y ERROR */ }
    const showError = error => {
        return (
            <div className="alert alert-danger" style={{ display: error ? '':'none' }}>
                { error }
            </div>
        )
    }

    const showSuccess = (success) => {
        return (
            <div className="alert alert-info" style={{ display: success ? '':'none' }}>
                ¡Muchas gracias por confiar en nostros!, tu pago ha sido procesado por el servicio de terceros (pago seguro), y se ha registrado en nuestra plataforma
            </div>
        )
    }

    const showLoading = (loading) => {
        return (
            loading && <div className="alert alert-info">Cargando...</div>
        );
    }



    { /* ****************************************************************** */ }
    { /* ***********************  F R O N T E N D   *************************/ }
    { /* ****************************************************************** */ }

    return (
        <div>
            <h2>Total: ${ getTotalProduct() }</h2>
            { showLoading(data.loading) }
            { showSuccess(data.successBuy) }
            { showError(data.error) }
            { showActionsCheckout() }
            <div className="col-12">
            
            </div>
        </div>
    );
}

export default Checkout;
