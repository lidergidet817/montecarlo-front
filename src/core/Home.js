import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { getProducts} from "./ApiCore"
import Card from './Card';
import Search from './Search';

const Home = () => {

    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductBySell = () => {
        getProducts('sold').then(data=> {
            if(data.error){
                setError(data.error)
            }else{
                console.log("sin errores 1", data)
                setProductsBySell(data)
            }
        })
    }

    const loadProductByArrival = () => {
        getProducts('createdAt').then(data=> {
            if(data.error){
                setError(data.error)
            }else{
                console.log("sin errores 2", data)
                setProductsByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductByArrival()
        loadProductBySell()
    }, [])

    return (
        <Layout title='Home' description='Página principal (proyecto MERN Stack - desarrollado por Jaime Díaz.)' classname='container'>
            <Search />
            <h2 className="mb-4">Best Seller</h2>
            <div className="row">
                { productsBySell.map((product, index)=> (
                    <div key={index} className="col-4 mb-3">
                        <Card product={ product } />
                    </div>
                ))}            
            </div>
            <hr>
            </hr>
            <h2 className="mb-4">New Arrival</h2>
            <div className="row">
                { productsByArrival.map((product, index)=> (
                    <div key={index} className="col-4 mb-3">
                        <Card product={ product } />
                    </div>                    
                ))}
            </div>
        </Layout>
    );
}

export default Home;    
