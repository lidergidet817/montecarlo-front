import React, {useState, useEffect} from 'react';
import Layout from '../../core/Layout';
import { getCartLS, getTotalItemsLS } from '../helpers/CartHelpers';
import Card from '../../core/Card';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = () => {

    const [items, setItems] = useState([])    

    // fix update infinite
    const [run, setRun] = useState(false);
    // fix

    /* 
    cada vez que haya un cambio en el estadp de items, se ejecutará useEffect
    */
   useEffect(()=> {                
        setItems(getCartLS())
    },[run])

    const showItems = (items) => {
        return (
            <div className="">
                <h2>Tu carrito tiene {`${items.length} elementos`}</h2>
                <hr />
                { items.map((product, index)=>(
                    <Card 
                        key={index}
                        product={product} 
                        showAddProductButton={false}
                        cartUpdate={true} 
                        showRemoveProductButton={true}
                        setRun = {setRun}
                        run = { run }
                    />
                )) }
            </div>
        )
    }

    const noItemsMessage = () => {
        return (
            <h2>
                Tu carrito de compras no contiene paquetes/servicios/productos.<br />                
                <Link to="/shop">Continuar comprando</Link>
            </h2>
        )
    }

    return (
        <Layout 
            title='Carrito de compras'
            description='Administre su carrito de compras, agregando o quitando paquetes/servicios'
            classname='container'
        >

            <div className="row">
                <div className="col-6">
                    { items.length > 0 ? showItems(items) : noItemsMessage() }
                </div>

                <div className="col-6">
                    <h2 className="mb-4 ">Resumen de tu carrito de compras</h2>
                    <hr />
                    <Checkout 
                        products={ items }
                        setRun = {setRun}
                        run = { run } 
                    />
                </div>                
            </div>
        </Layout>                    
    );
}

export default Cart;
