import React from 'react';
import {API} from '../config';

const validateGetImageFromProduct = (item, url) => {
    
    if (!item.containImage){
        return (
            <div className="alert alert-alert-warning">
                <h4>No existe imágen asociada a este producto.</h4>
            </div>
        );
    }else{
        return (
            <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="img-thumbnail mb-3" style= {{ maxHeight: "100%", maxWidth: "100%"}} />
        );
    }
}

const ShowImage = ({item, url}) => {
    return (
        <div className="product-image">
            { validateGetImageFromProduct(item,url)}
        </div>
    );
}

export default ShowImage;
