import React, { useEffect, useState } from 'react';
import { getProducts, getCategories, read, getListProductRelated } from './ApiCore';
import Layout from './Layout';
import Card from './Card';

const ProductDetail = (props) => {

    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [error, setError] = useState(false)

    const loadSingleProductDetail = productId => {
        read(productId)
        .then(data =>{
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data)
                // fetch related products
                getListProductRelated(data._id)
                .then(data => {
                    if(data.error){
                        setError(data.error)
                    }else{
                        setRelatedProduct(data);
                    }
                })
            }
        })
    }

    useEffect(()=> {
        const productId = props.match.params.productId;
        loadSingleProductDetail(productId);
    }, [props])

    return (
        <Layout title={product && product.name} description={product && product.description && product.description.substring(0,100)} classname='container'>            
            <div className="row">
                <div className="col-8">                
                    { /*JSON.stringify(product) */ }
                    <h2 className="mb-4">Producto simple</h2>
                    {product && product.description && product.description && <Card product={ product } showViewProductButton={false} />}
                </div>
                <div className="col-4">
                    <h4 className="mb-4">Productos relacionados</h4>
                    { relatedProduct.map((prod, index) =>(
                        <div className="mb-3" key={index}>
                            <Card product={prod} />
                        </div>
                    )) }
                </div>
            </div>
        </Layout>              
    );
}

export default ProductDetail;
