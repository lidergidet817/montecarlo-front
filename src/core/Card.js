import React, { useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {
    addItemLocalStorage, 
    updateDataItem,
    removeDataItem
} from './helpers/CartHelpers';

const Card = ({
        product, 
        showViewProductButton=true, 
        showAddProductButton=true,
        cartUpdate = false,
        showRemoveProductButton = false,
        setRun = fn => fn, // valor por defecto para la función
        run = undefined // valor por defecto
    }) => {

    const [redirect, setRedirect] = useState(false);
    const [countItems, setCountItems] = useState(product.count);

    // boton ver producto
    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2">
                        Ver Producto
                    </button>                
                </Link>
            )
        );
    }

    const addToCart = () => {
        addItemLocalStorage(product, () => {
            // callBack
            setRedirect(true);
        });
    }

    const removeToCart = () => {

    }

    const shouldRedirect = redirect => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    // boton agregar al carrito
    const showAddToCartButton = (showAddProductButton) => {
        return (
            showAddProductButton && (
                <button onClick={ addToCart } className="btn btn-outline-warning ml-3 mt-2 mb-2">
                    Agregar al carrito
                </button>
            )
        );
    }

    // boton para remover del carrito
    const showRemoveFromCartButton = (showRemoveProductButton) => {
        return (
            showRemoveProductButton && (
                <button 
                    onClick={ () => {                        
                        removeDataItem(product._id) 
                        setRun(!run)
                    }}
                    className="btn btn-outline-danger ml-3 mt-2 mb-2"
                >
                    Quitar del carrito
                </button>
            )
        );
    }    

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill">En Stock</span>
        ):(
            <span className="badge badge-primary badge-pill">Fuera del Stock</span>
        );
    };

    // events handle
    const handleChange = productId => event => {
        // TODO: fix
        setRun(!run);
        // TODO: end fix
        console.log("cnontador actual: ", event.target.value, productId)
        setCountItems(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1){
            updateDataItem(productId, event.target.value);
        }else{

        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Ajustar la cantidad</span>
                </div>
                <input type="number" className="form-control" value={countItems} onChange={ handleChange(product._id) } />
            </div>
        )
    }

    return (        
        <div className="card">
            <div className="card-header name">
                <div className="card-title mb-0">{ product.name }</div>                    
            </div>                
            <div className="card-body">
                { shouldRedirect(redirect) }
                <ShowImage item={ product } url="product" />
                <p className="lead mt-2">
                    { product.description.substring(0,100) }
                </p>
                <p className="black-10"><span>$</span>{ product.price }</p>
                <p className="black-9">Category: { product.category && product.category.name }</p>
                <p className="black-8">Adicionado en { moment(product.createdAt).fromNow() } </p>
                <div>
                    { showStock(product.quantity) }
                </div>          
                <div className="buttons content">
                    { showViewButton(showViewProductButton) }
                    { showAddToCartButton(showAddProductButton) }
                    { showRemoveFromCartButton(showRemoveProductButton) }
                    { showCartUpdateOptions(cartUpdate) }
                </div>           
            </div>
        </div>        
    );
}

export default Card;
